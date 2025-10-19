import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders textarea element', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Textarea label="Message" />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Textarea label="Required Field" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Textarea helperText="Helper message" />);
    expect(screen.getByText('Helper message')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Textarea error="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('hides helper text when error is shown', () => {
    render(<Textarea helperText="Helper" error="Error" />);
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('applies error styles', () => {
    render(<Textarea error="Error" />);
    expect(screen.getByRole('textbox')).toHaveClass('border-red-300');
  });

  it('applies disabled state', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('applies resize classes', () => {
    const { rerender } = render(<Textarea resize="none" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize-none');

    rerender(<Textarea resize="both" />);
    expect(screen.getByRole('textbox')).toHaveClass('resize');
  });

  it('accepts custom className', () => {
    render(<Textarea className="custom-class" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });

  it('forwards HTML attributes', () => {
    render(<Textarea placeholder="Enter text" rows={5} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter text');
    expect(textarea).toHaveAttribute('rows', '5');
  });
});
