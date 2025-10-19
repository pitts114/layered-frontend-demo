import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Label } from './Label';

describe('Label', () => {
  it('renders children correctly', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required indicator', () => {
    render(<Label required>Required Field</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('forwards HTML attributes', () => {
    render(<Label htmlFor="test-input">Label</Label>);
    expect(screen.getByText('Label')).toHaveAttribute('for', 'test-input');
  });
});
