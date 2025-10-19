import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('shows fallback when no src', () => {
    render(<Avatar alt="John Doe" />);
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('shows custom fallback', () => {
    render(<Avatar fallback="AB" />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container } = render(<Avatar size="lg" />);
    expect(container.firstChild).toHaveClass('w-16', 'h-16');
  });
});
