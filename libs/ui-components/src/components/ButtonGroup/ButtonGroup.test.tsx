import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children correctly', () => {
    render(
      <ButtonGroup>
        <button>Button 1</button>
        <button>Button 2</button>
      </ButtonGroup>,
    );
    expect(screen.getByText('Button 1')).toBeInTheDocument();
    expect(screen.getByText('Button 2')).toBeInTheDocument();
  });

  it('has role group', () => {
    const { container } = render(<ButtonGroup><button>Test</button></ButtonGroup>);
    expect(container.firstChild).toHaveAttribute('role', 'group');
  });

  it('applies orientation classes', () => {
    const { container, rerender } = render(<ButtonGroup><button>Test</button></ButtonGroup>);
    expect(container.firstChild).toHaveClass('flex-row');

    rerender(<ButtonGroup orientation="vertical"><button>Test</button></ButtonGroup>);
    expect(container.firstChild).toHaveClass('flex-col');
  });
});
