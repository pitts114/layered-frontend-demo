import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('renders register form with heading', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('heading', { name: 'Register' })).toBeInTheDocument();
  });

  it('renders email, password, and confirm password inputs', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Password/)[0]).toBeInTheDocument(); // First Password field
    expect(screen.getByLabelText(/Confirm Password/)).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument();
  });

  it('calls onSubmit with email, password, and confirmation when form is submitted', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getAllByLabelText(/Password/)[0], 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/), 'password123');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith('test@example.com', 'password123', 'password123');
  });

  it('displays password mismatch error when passwords do not match', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getAllByLabelText(/Password/)[0], 'password123');
    await user.type(screen.getByLabelText(/Confirm Password/), 'differentpass');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('clears password mismatch error when user types in password field', async () => {
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getAllByLabelText(/Password/)[0], 'pass1');
    await user.type(screen.getByLabelText(/Confirm Password/), 'pass2');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();

    // Type in password field to clear error
    await user.type(screen.getAllByLabelText(/Password/)[0], '23');

    expect(screen.queryByText('Passwords do not match.')).not.toBeInTheDocument();
  });

  it('clears password mismatch error when user types in confirm password field', async () => {
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={vi.fn()} />);

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getAllByLabelText(/Password/)[0], 'pass1');
    await user.type(screen.getByLabelText(/Confirm Password/), 'pass2');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();

    // Type in confirm password field to clear error
    await user.type(screen.getByLabelText(/Confirm Password/), '3');

    expect(screen.queryByText('Passwords do not match.')).not.toBeInTheDocument();
  });

  it('displays server error message when error prop is provided', () => {
    render(<RegisterForm onSubmit={vi.fn()} error="Email already exists" />);
    expect(screen.getByText('Email already exists')).toBeInTheDocument();
  });

  it('shows loading text when isLoading is true', () => {
    render(<RegisterForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByRole('button', { name: 'Registering...' })).toBeInTheDocument();
  });

  it('disables inputs when isLoading is true', () => {
    render(<RegisterForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByLabelText(/Email/)).toBeDisabled();
    expect(screen.getAllByLabelText(/Password/)[0]).toBeDisabled();
    expect(screen.getByLabelText(/Confirm Password/)).toBeDisabled();
  });

  it('disables submit button when isLoading is true', () => {
    render(<RegisterForm onSubmit={vi.fn()} isLoading />);
    expect(screen.getByRole('button', { name: 'Registering...' })).toBeDisabled();
  });

  it('marks all inputs as required', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toBeRequired();
    expect(screen.getAllByLabelText(/Password/)[0]).toBeRequired();
    expect(screen.getByLabelText(/Confirm Password/)).toBeRequired();
  });

  it('has correct input type for email field', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText(/Email/)).toHaveAttribute('type', 'email');
  });

  it('has correct input type for password fields', () => {
    render(<RegisterForm onSubmit={vi.fn()} />);
    expect(screen.getAllByLabelText(/Password/)[0]).toHaveAttribute('type', 'password');
    expect(screen.getByLabelText(/Confirm Password/)).toHaveAttribute('type', 'password');
  });

  it('updates input values on user input', async () => {
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={vi.fn()} />);

    const emailInput = screen.getByLabelText(/Email/);
    const passwordInput = screen.getAllByLabelText(/Password/)[0];
    const confirmInput = screen.getByLabelText(/Confirm Password/);

    await user.type(emailInput, 'user@test.com');
    await user.type(passwordInput, 'secret');
    await user.type(confirmInput, 'secret');

    expect(emailInput).toHaveValue('user@test.com');
    expect(passwordInput).toHaveValue('secret');
    expect(confirmInput).toHaveValue('secret');
  });

  it('can display both server error and password mismatch error', async () => {
    const user = userEvent.setup();

    render(<RegisterForm onSubmit={vi.fn()} error="Server error occurred" />);

    expect(screen.getByText('Server error occurred')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/Email/), 'test@example.com');
    await user.type(screen.getAllByLabelText(/Password/)[0], 'pass1');
    await user.type(screen.getByLabelText(/Confirm Password/), 'pass2');
    await user.click(screen.getByRole('button', { name: 'Register' }));

    expect(screen.getByText('Server error occurred')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });
});
