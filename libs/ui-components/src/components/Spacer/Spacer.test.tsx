import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Spacer } from './Spacer';

describe('Spacer', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as div element', () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });

  it('applies vertical spacing by default', () => {
    const { container } = render(<Spacer size={4} />);
    expect(container.firstChild).toHaveClass('h-4');
  });

  it('applies horizontal spacing when specified', () => {
    const { container } = render(<Spacer size={8} axis="horizontal" />);
    expect(container.firstChild).toHaveClass('w-8');
  });

  it('applies both axes when specified', () => {
    const { container } = render(<Spacer size={6} axis="both" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass('w-6');
    expect(element).toHaveClass('h-6');
  });

  it('accepts different sizes', () => {
    const { container, rerender } = render(<Spacer size={2} />);
    expect(container.firstChild).toHaveClass('h-2');

    rerender(<Spacer size={16} />);
    expect(container.firstChild).toHaveClass('h-16');
  });

  it('has aria-hidden attribute', () => {
    const { container } = render(<Spacer />);
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true');
  });

  it('accepts custom className', () => {
    const { container } = render(<Spacer className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
