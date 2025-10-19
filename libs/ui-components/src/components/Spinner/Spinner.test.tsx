import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders with role status', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has aria-label', () => {
    render(<Spinner />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    expect(screen.getByRole('status')).toHaveClass('w-4', 'h-4');

    rerender(<Spinner size="xl" />);
    expect(screen.getByRole('status')).toHaveClass('w-16', 'h-16');
  });

  it('applies color classes', () => {
    const { rerender } = render(<Spinner color="primary" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-blue-600');

    rerender(<Spinner color="white" />);
    expect(screen.getByRole('status')).toHaveClass('border-t-white');
  });
});
