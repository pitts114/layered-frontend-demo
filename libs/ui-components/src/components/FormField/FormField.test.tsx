import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders children correctly', () => {
    render(
      <FormField>
        <div>Child Content</div>
      </FormField>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(
      <FormField label="Test Label">
        <input />
      </FormField>
    );
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(
      <FormField label="Field" required>
        <input />
      </FormField>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <FormField error="Error message">
        <input />
      </FormField>
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <FormField helperText="Helper text">
        <input />
      </FormField>
    );
    expect(screen.getByText('Helper text')).toBeInTheDocument();
  });
});
