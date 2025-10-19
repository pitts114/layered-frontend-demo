import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Flex } from './Flex';

describe('Flex', () => {
  it('renders children correctly', () => {
    render(
      <Flex>
        <div>Item 1</div>
        <div>Item 2</div>
      </Flex>,
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('applies flex class', () => {
    const { container } = render(
      <Flex>
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('flex');
  });

  it('applies direction classes', () => {
    const { container, rerender } = render(
      <Flex direction="row">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('flex-row');

    rerender(
      <Flex direction="col">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('flex-col');
  });

  it('applies align classes', () => {
    const { container, rerender } = render(
      <Flex align="center">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('items-center');

    rerender(
      <Flex align="start">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('items-start');
  });

  it('applies justify classes', () => {
    const { container, rerender } = render(
      <Flex justify="center">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('justify-center');

    rerender(
      <Flex justify="between">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('justify-between');
  });

  it('applies wrap classes', () => {
    const { container, rerender } = render(
      <Flex wrap={true}>
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('flex-wrap');

    rerender(
      <Flex wrap="reverse">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('flex-wrap-reverse');
  });

  it('applies gap classes', () => {
    const { container } = render(
      <Flex gap={4}>
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('gap-4');
  });

  it('accepts custom className', () => {
    const { container } = render(
      <Flex className="custom-class">
        <div>Item</div>
      </Flex>,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
