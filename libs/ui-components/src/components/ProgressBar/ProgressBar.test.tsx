import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders with correct aria attributes', () => {
    render(<ProgressBar value={50} max={100} />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  it('calculates percentage correctly', () => {
    render(<ProgressBar value={50} showLabel />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<ProgressBar value={50} variant="success" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-green-600');

    rerender(<ProgressBar value={50} variant="error" />);
    expect(screen.getByRole('progressbar')).toHaveClass('bg-red-600');
  });

  it('shows label when showLabel is true', () => {
    render(<ProgressBar value={75} showLabel />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});
