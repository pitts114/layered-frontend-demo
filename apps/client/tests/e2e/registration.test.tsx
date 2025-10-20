import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import { Provider } from 'react-redux';
import { store } from '../../src/store/store';
import { generateEmail } from '../test-utils';

describe('Registration E2E Flow', () => {
  it('allows a user to register and see their email on the home page', async () => {
    // Get a unique email from the factory endpoint
    const email = await generateEmail();
    expect(email).toBeTruthy();

    const password = 'TestPassword123!';

    // Render the full app starting at /login
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    // Navigate to register page by clicking the register link
    const registerLink = await screen.findByText(/register here/i);
    fireEvent.click(registerLink);

    // Wait for register page to load
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();
    });

    // Fill out the registration form
    const emailInput = screen.getByLabelText(/^email/i);
    const passwordInput = screen.getAllByLabelText(/password/i)[0]; // First password field
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    fireEvent.change(emailInput, { target: { value: email! } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, { target: { value: password } });

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /register/i });
    fireEvent.click(submitButton);

    // Wait for redirect to home page and verify logged in state
    await waitFor(
      () => {
        expect(screen.getByText(/logged in as:/i)).toBeInTheDocument();
        expect(screen.getByText(email!)).toBeInTheDocument();
      },
      { timeout: 10000 } // Longer timeout for real API calls
    );

    // Verify we're on the home page with counter functionality
    expect(screen.getByRole('heading', { name: /vite \+ react/i })).toBeInTheDocument();
  }, 15000); // 15 second timeout for entire E2E test
});
