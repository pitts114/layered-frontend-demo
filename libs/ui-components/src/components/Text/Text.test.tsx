import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as paragraph by default', () => {
    const { container } = render(<Text>Content</Text>);
    expect(container.querySelector('p')).toBeInTheDocument();
  });

  it('renders as span when specified', () => {
    const { container } = render(<Text as="span">Content</Text>);
    expect(container.querySelector('span')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Text variant="body1">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-base');

    rerender(<Text variant="caption">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-xs');

    rerender(<Text variant="overline">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('uppercase');
  });

  it('applies weight styles', () => {
    const { rerender } = render(<Text weight="normal">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('font-normal');

    rerender(<Text weight="bold">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('font-bold');
  });

  it('applies alignment styles', () => {
    const { rerender } = render(<Text align="left">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-left');

    rerender(<Text align="center">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-center');
  });

  it('applies color styles', () => {
    const { rerender } = render(<Text color="primary">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-gray-900');

    rerender(<Text color="error">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('text-red-600');
  });

  it('accepts custom className', () => {
    render(<Text className="custom-class">Content</Text>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(<Text data-testid="text-element">Content</Text>);
    expect(screen.getByTestId('text-element')).toBeInTheDocument();
  });
});
