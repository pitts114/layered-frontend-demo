import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio } from './Radio';

describe('Radio', () => {
  it('renders radio input', () => {
    render(<Radio name="test" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Radio label="Test Label" name="test" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('can be selected', async () => {
    const user = userEvent.setup();
    render(<Radio label="Test" name="test" />);
    const radio = screen.getByRole('radio');

    expect(radio).not.toBeChecked();
    await user.click(radio);
    expect(radio).toBeChecked();
  });

  it('displays helper text', () => {
    render(<Radio helperText="Helper message" name="test" />);
    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Radio disabled name="test" />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('can be checked by default', () => {
    render(<Radio defaultChecked name="test" />);
    expect(screen.getByRole('radio')).toBeChecked();
  });

  it('accepts custom className', () => {
    render(<Radio className="custom-class" name="test" />);
    expect(screen.getByRole('radio')).toHaveClass('custom-class');
  });
});
