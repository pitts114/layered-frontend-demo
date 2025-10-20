import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar', () => {
  describe('Rendering', () => {
    it('renders without content', () => {
      const { container } = render(<Navbar />);
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('renders left content', () => {
      render(<Navbar left={<div>Left Content</div>} />);
      expect(screen.getByText('Left Content')).toBeInTheDocument();
    });

    it('renders center content', () => {
      render(<Navbar center={<div>Center Content</div>} />);
      expect(screen.getByText('Center Content')).toBeInTheDocument();
    });

    it('renders right content', () => {
      render(<Navbar right={<div>Right Content</div>} />);
      expect(screen.getByText('Right Content')).toBeInTheDocument();
    });

    it('renders all content sections together', () => {
      render(<Navbar left={<div>Left</div>} center={<div>Center</div>} right={<div>Right</div>} />);
      expect(screen.getByText('Left')).toBeInTheDocument();
      expect(screen.getByText('Center')).toBeInTheDocument();
      expect(screen.getByText('Right')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = render(<Navbar className="custom-class" />);
      expect(container.querySelector('nav')).toHaveClass('custom-class');
    });

    it('applies default styling classes', () => {
      const { container } = render(<Navbar />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex');
      expect(nav).toHaveClass('items-center');
      expect(nav).toHaveClass('justify-between');
    });
  });

  describe('Layout', () => {
    it('renders with proper structure for left, center, and right sections', () => {
      const { container } = render(
        <Navbar
          left={<span data-testid="left">Left</span>}
          center={<span data-testid="center">Center</span>}
          right={<span data-testid="right">Right</span>}
        />
      );

      const nav = container.querySelector('nav');
      expect(nav?.children).toHaveLength(3);
    });
  });
});
