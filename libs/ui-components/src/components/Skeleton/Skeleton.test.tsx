import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with correct aria attributes', () => {
    const { container } = render(<Skeleton />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('applies variant styles', () => {
    const { container, rerender } = render(<Skeleton variant="circular" />);
    expect(container.firstChild).toHaveClass('rounded-full');

    rerender(<Skeleton variant="rectangular" />);
    expect(container.firstChild).toHaveClass('rounded-md');
  });

  it('applies animation styles', () => {
    const { container } = render(<Skeleton animation="pulse" />);
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('applies custom width and height', () => {
    const { container } = render(<Skeleton width={200} height={100} />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton.style.width).toBe('200px');
    expect(skeleton.style.height).toBe('100px');
  });
});
