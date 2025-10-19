import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('renders login form with heading', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders email and password inputs', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('calls onSubmit with email and password when form is submitted', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getByLabelText(/Password/), 'password123');
    await user.click(screen.getByRole('button', { name: 'Login' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('displays error message when error prop is provided', () => {
    render(<LoginForm onSubmit={vi.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });

  it('does not display error message when error prop is not provided', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    const errorElements = screen.queryByText(/Invalid/i);
    expect(errorElements).not.toBeInTheDocument();
  });

  it('shows loading text when isLoading is true', () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeInTheDocument();
  });

  it('disables inputs when isLoading is true', () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    expect(screen.getByLabelText(/Password/)).toBeDisabled();
  });

  it('disables submit button when isLoading is true', () => {
    render(<LoginForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByRole('button', { name: 'Logging in...' })).toBeDisabled();
  });

  it('does not call onSubmit when button is disabled', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} isLoading />);

    await user.click(screen.getByRole('button'));

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('updates email input value on user input', async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);
    const emailInput = screen.getByLabelText(/Email/);

    await user.type(emailInput, 'user@test.com');

    expect(emailInput).toHaveValue('user@test.com');
  });

  it('updates password input value on user input', async () => {
    const user = userEvent.setup();

    render(<LoginForm onSubmit={vi.fn()} />);
    const passwordInput = screen.getByLabelText(/Password/);

    await user.type(passwordInput, 'secretpass');

    expect(passwordInput).toHaveValue('secretpass');
  });

  it('marks email input as required', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
  });

  it('marks password input as required', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Password/)).toBeRequired();
  });

  it('has correct input type for email field', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('type', 'email');
  });

  it('has correct input type for password field', () => {
    render(<LoginForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Password/)).toHaveAttribute('type', 'password');
  });
});
