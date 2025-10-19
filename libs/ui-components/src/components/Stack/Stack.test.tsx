import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies vertical direction by default', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('flex-col');
  });

  it('applies horizontal direction', () => {
    render(
      <Stack direction="horizontal" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('flex-row');
  });

  it('applies default spacing (4)', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-4');
  });

  it('applies no spacing', () => {
    render(
      <Stack spacing={0} data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-0');
  });

  it('applies small spacing', () => {
    render(
      <Stack spacing={2} data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-2');
  });

  it('applies large spacing', () => {
    render(
      <Stack spacing={16} data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('gap-16');
  });

  it('applies align start', () => {
    render(
      <Stack align="start" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('items-start');
  });

  it('applies align center', () => {
    render(
      <Stack align="center" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('items-center');
  });

  it('applies align end', () => {
    render(
      <Stack align="end" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('items-end');
  });

  it('applies align stretch', () => {
    render(
      <Stack align="stretch" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('items-stretch');
  });

  it('applies justify start', () => {
    render(
      <Stack justify="start" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-start');
  });

  it('applies justify center', () => {
    render(
      <Stack justify="center" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-center');
  });

  it('applies justify between', () => {
    render(
      <Stack justify="between" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-between');
  });

  it('applies justify around', () => {
    render(
      <Stack justify="around" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-around');
  });

  it('applies justify evenly', () => {
    render(
      <Stack justify="evenly" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('justify-evenly');
  });

  it('applies flex-wrap when wrap is true', () => {
    render(
      <Stack wrap data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('flex-wrap');
  });

  it('does not apply flex-wrap by default', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId('stack');
    expect(stack).not.toHaveClass('flex-wrap');
  });

  it('accepts custom className', () => {
    render(
      <Stack className="custom-class" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('custom-class');
  });

  it('forwards HTML div attributes', () => {
    render(
      <Stack data-testid="stack" role="list">
        Content
      </Stack>
    );
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveAttribute('role', 'list');
  });

  it('always has flex class', () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId('stack');
    expect(stack).toHaveClass('flex');
  });
});
