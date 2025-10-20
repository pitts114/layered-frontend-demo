import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormGroup } from './FormGroup';

describe('FormGroup', () => {
  it('renders children correctly', () => {
    render(
      <FormGroup>
        <div>Child Content</div>
      </FormGroup>
    );
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });

  it('renders with legend', () => {
    render(
      <FormGroup legend="Test Legend">
        <div>Content</div>
      </FormGroup>
    );
    expect(screen.getByText('Test Legend')).toBeInTheDocument();
  });

  it('renders as fieldset element', () => {
    const { container } = render(
      <FormGroup>
        <div>Content</div>
      </FormGroup>
    );
    expect(container.querySelector('fieldset')).toBeInTheDocument();
  });
});
