import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  it('renders children correctly', () => {
    render(<Toast>Test message</Toast>);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Toast title="Test Title">Message</Toast>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Toast variant="success">Success</Toast>);
    expect(screen.getByRole('alert')).toHaveClass('bg-green-600');

    rerender(<Toast variant="error">Error</Toast>);
    expect(screen.getByRole('alert')).toHaveClass('bg-red-600');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    render(<Toast onClose={handleClose}>Message</Toast>);
    await user.click(screen.getByLabelText('Close'));
    expect(handleClose).toHaveBeenCalled();
  });
});
