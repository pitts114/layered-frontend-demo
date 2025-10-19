import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(
      <Container>
        <div>Test Content</div>
      </Container>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default max-width (lg)', () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-lg');
  });

  it('applies small max-width', () => {
    render(
      <Container maxWidth="sm" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-sm');
  });

  it('applies medium max-width', () => {
    render(
      <Container maxWidth="md" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-md');
  });

  it('applies extra large max-width', () => {
    render(
      <Container maxWidth="xl" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-xl');
  });

  it('applies 2xl max-width', () => {
    render(
      <Container maxWidth="2xl" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-screen-2xl');
  });

  it('applies full max-width', () => {
    render(
      <Container maxWidth="full" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('max-w-full');
  });

  it('applies default padding (md)', () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('px-6', 'py-4');
  });

  it('applies no padding', () => {
    render(
      <Container padding="none" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).not.toHaveClass('px-6', 'py-4');
  });

  it('applies small padding', () => {
    render(
      <Container padding="sm" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('px-4', 'py-2');
  });

  it('applies large padding', () => {
    render(
      <Container padding="lg" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('px-8', 'py-6');
  });

  it('centers by default', () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('mx-auto');
  });

  it('does not center when centered is false', () => {
    render(
      <Container centered={false} data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).not.toHaveClass('mx-auto');
  });

  it('accepts custom className', () => {
    render(
      <Container className="custom-class" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards HTML div attributes', () => {
    render(
      <Container data-testid="container" role="main">
        Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveAttribute('role', 'main');
  });
});
