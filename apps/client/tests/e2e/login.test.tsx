import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import { createTestUser } from '../test-utils';

describe('Login E2E Flow', () => {
  it('allows a user to log in with valid credentials and see their email on the home page', async () => {
    // Create a test user via the factory endpoint
    const testUser = await createTestUser();
    expect(testUser).toBeTruthy();
    expect(testUser!.email).toBeTruthy();
    expect(testUser!.password).toBeTruthy();

    // Render the full app starting at /login
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Wait for login page to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });

    // Fill out the login form
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: testUser!.email } });
    fireEvent.change(passwordInput, { target: { value: testUser!.password } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /^login$/i });
    fireEvent.click(submitButton);

    // Wait for redirect to home page and verify logged in state
    await waitFor(
      () => {
        expect(screen.getByText(/logged in as:/i)).toBeInTheDocument();
        expect(screen.getByText(testUser!.email)).toBeInTheDocument();
      },
      { timeout: 10000 } // Longer timeout for real API calls
    );

    // Verify we're on the home page
    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument();
  }, 15000); // 15 second timeout for entire E2E test
});
