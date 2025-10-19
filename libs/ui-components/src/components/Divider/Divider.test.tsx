import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders horizontal divider by default', () => {
    const { container } = render(<Divider />);
    expect(container.querySelector('hr')).toBeInTheDocument();
  });

  it('renders vertical divider when specified', () => {
    const { container } = render(<Divider orientation="vertical" />);
    expect(container.querySelector('div[role="separator"]')).toBeInTheDocument();
  });

  it('applies spacing classes for horizontal divider', () => {
    const { container, rerender } = render(<Divider spacing="sm" />);
    expect(container.querySelector('hr')).toHaveClass('my-2');

    rerender(<Divider spacing="lg" />);
    expect(container.querySelector('hr')).toHaveClass('my-6');
  });

  it('applies spacing classes for vertical divider', () => {
    const { container, rerender } = render(<Divider orientation="vertical" spacing="sm" />);
    expect(container.querySelector('div')).toHaveClass('mx-2');

    rerender(<Divider orientation="vertical" spacing="lg" />);
    expect(container.querySelector('div')).toHaveClass('mx-6');
  });

  it('accepts custom className', () => {
    const { container } = render(<Divider className="custom-class" />);
    expect(container.querySelector('hr')).toHaveClass('custom-class');
  });

  it('has proper aria attributes for vertical orientation', () => {
    const { container } = render(<Divider orientation="vertical" />);
    const divider = container.querySelector('div');
    expect(divider).toHaveAttribute('role', 'separator');
    expect(divider).toHaveAttribute('aria-orientation', 'vertical');
  });
});
