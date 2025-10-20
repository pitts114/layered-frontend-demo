import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Link } from './Link';

describe('Link', () => {
  it('renders children correctly', () => {
    render(<Link href="#">Click me</Link>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as anchor element', () => {
    render(<Link href="#">Link</Link>);
    expect(screen.getByText('Link').tagName).toBe('A');
  });

  it('applies href attribute', () => {
    render(<Link href="/test">Link</Link>);
    expect(screen.getByText('Link')).toHaveAttribute('href', '/test');
  });

  it('applies variant styles', () => {
    const { rerender } = render(
      <Link href="#" variant="default">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('text-blue-600');

    rerender(
      <Link href="#" variant="muted">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('text-gray-600');
  });

  it('applies underline styles', () => {
    const { rerender } = render(
      <Link href="#" underline="none">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('no-underline');

    rerender(
      <Link href="#" underline="always">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('underline');

    rerender(
      <Link href="#" underline="hover">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('hover:underline');
  });

  it('accepts custom className', () => {
    render(
      <Link href="#" className="custom-class">
        Link
      </Link>
    );
    expect(screen.getByText('Link')).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(
      <Link href="#" target="_blank" rel="noopener">
        Link
      </Link>
    );
    const link = screen.getByText('Link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener');
  });

  it('supports data attributes', () => {
    render(
      <Link href="#" data-testid="test-link">
        Link
      </Link>
    );
    expect(screen.getByTestId('test-link')).toBeInTheDocument();
  });
});
