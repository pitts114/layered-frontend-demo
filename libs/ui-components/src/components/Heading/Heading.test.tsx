import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heading } from './Heading';

describe('Heading', () => {
  it('renders children correctly', () => {
    render(<Heading>Test Heading</Heading>);
    expect(screen.getByText('Test Heading')).toBeInTheDocument();
  });

  it('renders h1 by default', () => {
    const { container } = render(<Heading>Content</Heading>);
    expect(container.querySelector('h1')).toBeInTheDocument();
  });

  it('renders correct heading levels', () => {
    const { container, rerender } = render(<Heading level={1}>H1</Heading>);
    expect(container.querySelector('h1')).toBeInTheDocument();

    rerender(<Heading level={2}>H2</Heading>);
    expect(container.querySelector('h2')).toBeInTheDocument();

    rerender(<Heading level={3}>H3</Heading>);
    expect(container.querySelector('h3')).toBeInTheDocument();

    rerender(<Heading level={4}>H4</Heading>);
    expect(container.querySelector('h4')).toBeInTheDocument();

    rerender(<Heading level={5}>H5</Heading>);
    expect(container.querySelector('h5')).toBeInTheDocument();

    rerender(<Heading level={6}>H6</Heading>);
    expect(container.querySelector('h6')).toBeInTheDocument();
  });

  it('applies size styles based on level', () => {
    const { rerender } = render(<Heading level={1}>Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('text-4xl');

    rerender(<Heading level={3}>Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('text-2xl');
  });

  it('applies weight styles', () => {
    const { rerender } = render(<Heading weight="bold">Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('font-bold');

    rerender(<Heading weight="normal">Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('font-normal');
  });

  it('applies alignment styles', () => {
    const { rerender } = render(<Heading align="left">Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('text-left');

    rerender(<Heading align="center">Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('text-center');
  });

  it('accepts custom className', () => {
    render(<Heading className="custom-class">Content</Heading>);
    expect(screen.getByText('Content')).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(<Heading data-testid="heading-element">Content</Heading>);
    expect(screen.getByTestId('heading-element')).toBeInTheDocument();
  });
});
