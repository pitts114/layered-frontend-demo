import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './Grid';

describe('Grid', () => {
  it('renders children correctly', () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies grid class', () => {
    const { container } = render(
      <Grid>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('grid');
  });

  it('applies column classes', () => {
    const { container, rerender } = render(
      <Grid cols={2}>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('grid-cols-2');

    rerender(
      <Grid cols={4}>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('grid-cols-4');
  });

  it('applies gap classes', () => {
    const { container, rerender } = render(
      <Grid gap={4}>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('gap-4');

    rerender(
      <Grid gap={8}>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('gap-8');
  });

  it('uses default values', () => {
    const { container } = render(
      <Grid>
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('grid-cols-1', 'gap-4');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <Grid className="custom-class">
        <div>Item</div>
      </Grid>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(
      <Grid data-testid="grid-element">
        <div>Item</div>
      </Grid>,
    );
    expect(screen.getByTestId('grid-element')).toBeInTheDocument();
  });
});
