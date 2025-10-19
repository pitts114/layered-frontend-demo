import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders children correctly', () => {
    render(<Box>Test Content</Box>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders as div by default', () => {
    const { container } = render(<Box>Content</Box>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('renders as specified element', () => {
    const { container } = render(<Box as="section">Content</Box>);
    expect(container.firstChild?.nodeName).toBe('SECTION');
  });

  it('applies padding classes', () => {
    const { container } = render(<Box padding={4}>Content</Box>);
    expect(container.firstChild).toHaveClass('p-4');
  });

  it('applies margin classes', () => {
    const { container } = render(<Box margin={6}>Content</Box>);
    expect(container.firstChild).toHaveClass('m-6');
  });

  it('applies background classes', () => {
    const { container, rerender } = render(<Box bg="white">Content</Box>);
    expect(container.firstChild).toHaveClass('bg-white');

    rerender(<Box bg="gray">Content</Box>);
    expect(container.firstChild).toHaveClass('bg-gray-100');
  });

  it('applies rounded classes', () => {
    const { container, rerender } = render(<Box rounded="md">Content</Box>);
    expect(container.firstChild).toHaveClass('rounded-md');

    rerender(<Box rounded="lg">Content</Box>);
    expect(container.firstChild).toHaveClass('rounded-lg');
  });

  it('applies shadow classes', () => {
    const { container, rerender } = render(<Box shadow="md">Content</Box>);
    expect(container.firstChild).toHaveClass('shadow-md');

    rerender(<Box shadow="xl">Content</Box>);
    expect(container.firstChild).toHaveClass('shadow-xl');
  });

  it('applies border when specified', () => {
    const { container } = render(<Box border>Content</Box>);
    expect(container.firstChild).toHaveClass('border', 'border-gray-300');
  });

  it('does not apply border by default', () => {
    const { container } = render(<Box>Content</Box>);
    expect(container.firstChild).not.toHaveClass('border');
  });

  it('accepts custom className', () => {
    const { container } = render(<Box className="custom-class">Content</Box>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(<Box data-testid="box-element">Content</Box>);
    expect(screen.getByTestId('box-element')).toBeInTheDocument();
  });
});
