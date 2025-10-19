import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Select } from './Select';

const mockOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders select element', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={mockOptions} />);
    expect(screen.getByRole('option', { name: 'Option 1' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 2' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Option 3' })).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Select label="Choose" options={mockOptions} />);
    expect(screen.getByLabelText('Choose')).toBeInTheDocument();
  });

  it('renders placeholder option', () => {
    render(<Select placeholder="Select one" options={mockOptions} />);
    expect(screen.getByRole('option', { name: 'Select one' })).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Select label="Required Field" required options={mockOptions} />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Select helperText="Helper message" options={mockOptions} />);
    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Select error="Error message" options={mockOptions} />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('applies disabled state', () => {
    render(<Select disabled options={mockOptions} />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });

  it('renders disabled options', () => {
    const optionsWithDisabled = [
      { value: '1', label: 'Enabled' },
      { value: '2', label: 'Disabled', disabled: true },
    ];
    render(<Select options={optionsWithDisabled} />);
    const disabledOption = screen.getByRole('option', { name: 'Disabled' });
    expect(disabledOption).toHaveAttribute('disabled');
  });

  it('accepts custom className', () => {
    render(<Select className="custom-class" options={mockOptions} />);
    expect(screen.getByRole('combobox')).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(<Select data-testid="select-test" options={mockOptions} />);
    expect(screen.getByTestId('select-test')).toBeInTheDocument();
  });
});
