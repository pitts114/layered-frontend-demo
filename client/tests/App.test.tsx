import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import { renderWithProviders } from './test-utils';

describe('App Component', () => {
  describe('Rendering', () => {
    it('renders the heading', () => {
      renderWithProviders(<App />);
      expect(screen.getByText('Vite + React')).toBeInTheDocument();
    });

    it('renders increment and decrement buttons', () => {
      renderWithProviders(<App />);
      expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    });

    it('renders the initial count display', () => {
      renderWithProviders(<App />);
      expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    });

    it('renders the Vite and React logos', () => {
      renderWithProviders(<App />);
      const logos = screen.getAllByRole('img');
      expect(logos).toHaveLength(2);
      expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
      expect(screen.getByAltText('React logo')).toBeInTheDocument();
    });

    it('renders the informational text', () => {
      renderWithProviders(<App />);
      expect(
        screen.getByText('Click on the Vite and React logos to learn more')
      ).toBeInTheDocument();
    });
  });

  describe('Counter Functionality', () => {
    it('increments count when increment button is clicked', () => {
      renderWithProviders(<App />);
      const incrementButton = screen.getByRole('button', { name: /increment/i });

      fireEvent.click(incrementButton);
      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    });

    it('decrements count when decrement button is clicked', () => {
      renderWithProviders(<App />);
      const decrementButton = screen.getByRole('button', { name: /decrement/i });

      fireEvent.click(decrementButton);
      expect(screen.getByText(/count: -1/i)).toBeInTheDocument();
    });

    it('handles multiple increments correctly', () => {
      renderWithProviders(<App />);
      const incrementButton = screen.getByRole('button', { name: /increment/i });

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(screen.getByText(/count: 3/i)).toBeInTheDocument();
    });

    it('handles multiple decrements correctly', () => {
      renderWithProviders(<App />);
      const decrementButton = screen.getByRole('button', { name: /decrement/i });

      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);
      fireEvent.click(decrementButton);

      expect(screen.getByText(/count: -3/i)).toBeInTheDocument();
    });

    it('handles mixed increment and decrement operations', () => {
      renderWithProviders(<App />);
      const incrementButton = screen.getByRole('button', { name: /increment/i });
      const decrementButton = screen.getByRole('button', { name: /decrement/i });

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);

      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('can render with preloaded state', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          counter: { value: 10 },
        },
      });

      expect(screen.getByText(/count: 10/i)).toBeInTheDocument();
    });

    it('increments from preloaded state correctly', () => {
      renderWithProviders(<App />, {
        preloadedState: {
          counter: { value: 10 },
        },
      });

      const incrementButton = screen.getByRole('button', { name: /increment/i });
      fireEvent.click(incrementButton);

      expect(screen.getByText(/count: 11/i)).toBeInTheDocument();
    });
  });
});
