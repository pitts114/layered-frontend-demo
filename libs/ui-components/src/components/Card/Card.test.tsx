import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Test Content</Card>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies padding classes', () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('p-8');
  });

  it('applies shadow classes', () => {
    const { container } = render(<Card shadow="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  it('applies border when specified', () => {
    const { container } = render(<Card border>Content</Card>);
    expect(container.firstChild).toHaveClass('border');
  });
});
