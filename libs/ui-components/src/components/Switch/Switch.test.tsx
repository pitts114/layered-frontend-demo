import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders switch input', () => {
    render(<Switch />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Switch label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('can be toggled', async () => {
    const user = userEvent.setup();
    render(<Switch label="Test" />);
    const switchInput = screen.getByRole('checkbox');

    expect(switchInput).not.toBeChecked();
    await user.click(switchInput);
    expect(switchInput).toBeChecked();
  });

  it('displays helper text', () => {
    render(<Switch helperText="Helper message" />);
    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('can be checked by default', () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
