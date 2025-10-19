import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children correctly', () => {
    render(<Alert>Test message</Alert>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Alert title="Test Title">Message</Alert>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-50');

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
  });

  it('shows close button when onClose is provided', () => {
    render(<Alert onClose={() => {}}>Message</Alert>);
    expect(screen.getByLabelText('Close')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<Alert onClose={handleClose}>Message</Alert>);
    await user.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
