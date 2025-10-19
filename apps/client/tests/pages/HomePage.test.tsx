import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { HomePage } from '../../src/pages/HomePage';
import { renderWithProviders } from '../test-utils';

describe('HomePage', () => {
  describe('Rendering', () => {
    it('renders the heading', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      expect(screen.getByText('Vite + React')).toBeInTheDocument();
    });

    it('displays the logged-in user email', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText(/Logged in as:/i)).toBeInTheDocument();
    });

    it('renders increment and decrement buttons', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      expect(screen.getByRole('button', { name: /increment/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /decrement/i })).toBeInTheDocument();
    });

    it('displays the current count', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 5 },
        },
      });

      expect(screen.getByText(/count: 5/i)).toBeInTheDocument();
    });
  });

  describe('Counter Functionality', () => {
    it('increments count when increment button is clicked', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      const incrementButton = screen.getByRole('button', { name: /increment/i });
      fireEvent.click(incrementButton);

      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    });

    it('decrements count when decrement button is clicked', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      const decrementButton = screen.getByRole('button', { name: /decrement/i });
      fireEvent.click(decrementButton);

      expect(screen.getByText(/count: -1/i)).toBeInTheDocument();
    });

    it('handles multiple counter operations', () => {
      renderWithProviders(<HomePage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
          counter: { value: 0 },
        },
      });

      const incrementButton = screen.getByRole('button', { name: /increment/i });
      const decrementButton = screen.getByRole('button', { name: /decrement/i });

      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(decrementButton);

      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
    });
  });
});
