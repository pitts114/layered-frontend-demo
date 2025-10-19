import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('renders children correctly', () => {
    render(<IconButton>✕</IconButton>);
    expect(screen.getByRole('button')).toHaveTextContent('✕');
  });

  it('applies variant styles', () => {
    const { rerender } = render(<IconButton variant="primary">+</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-100');

    rerender(<IconButton variant="danger">×</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-100');
  });

  it('applies size styles', () => {
    const { rerender } = render(<IconButton size="sm">+</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('p-1.5');

    rerender(<IconButton size="lg">+</IconButton>);
    expect(screen.getByRole('button')).toHaveClass('p-3');
  });

  it('can be disabled', () => {
    render(<IconButton disabled>+</IconButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
