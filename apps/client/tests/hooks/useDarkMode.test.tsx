import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { type MockProxy, mock } from 'vitest-mock-extended';
import { useDarkMode } from '../../src/hooks/useDarkMode';
import type { DarkModePreferenceManager } from '../../src/lib/DarkModePreferenceManager';

type PreferenceChangeListener = (isDark: boolean) => void;

function DarkModeTestHarness({ manager }: { manager: DarkModePreferenceManager }) {
  const { isDark, toggleDarkMode } = useDarkMode(manager);

  return (
    <div>
      <div data-testid="dark-mode-status">{isDark ? 'dark' : 'light'}</div>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </div>
  );
}

describe('useDarkMode', () => {
  let mockManager: MockProxy<DarkModePreferenceManager>;
  let listeners: Set<PreferenceChangeListener>;

  beforeEach(() => {
    listeners = new Set();
    mockManager = mock<DarkModePreferenceManager>();

    mockManager.getPreference.mockReturnValue(false);
    mockManager.subscribe.mockImplementation((listener: PreferenceChangeListener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    });
    mockManager.togglePreference.mockImplementation(() => {
      const newValue = !mockManager.getPreference();
      mockManager.getPreference.mockReturnValue(newValue);
      listeners.forEach(listener => listener(newValue));
    });
  });

  it('should initialize with light mode by default', () => {
    render(<DarkModeTestHarness manager={mockManager} />);

    const status = screen.getByTestId('dark-mode-status');
    expect(status.textContent).toBe('light');
    expect(mockManager.getPreference).toHaveBeenCalled();
  });

  it('should initialize with dark mode when manager returns true', () => {
    mockManager.getPreference.mockReturnValue(true);
    render(<DarkModeTestHarness manager={mockManager} />);

    const status = screen.getByTestId('dark-mode-status');
    expect(status.textContent).toBe('dark');
  });

  it('should toggle dark mode when toggle button is clicked', () => {
    render(<DarkModeTestHarness manager={mockManager} />);

    const status = screen.getByTestId('dark-mode-status');
    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });

    expect(status.textContent).toBe('light');

    fireEvent.click(toggleButton);
    expect(mockManager.togglePreference).toHaveBeenCalled();
    expect(status.textContent).toBe('dark');

    fireEvent.click(toggleButton);
    expect(mockManager.togglePreference).toHaveBeenCalledTimes(2);
    expect(status.textContent).toBe('light');
  });

  it('should subscribe to manager changes on mount', () => {
    render(<DarkModeTestHarness manager={mockManager} />);

    expect(mockManager.subscribe).toHaveBeenCalledTimes(1);
    expect(mockManager.subscribe).toHaveBeenCalledWith(expect.any(Function));
  });

  it('should unsubscribe on unmount', () => {
    const unsubscribeMock = vi.fn();
    mockManager.subscribe.mockReturnValue(unsubscribeMock);

    const { unmount } = render(<DarkModeTestHarness manager={mockManager} />);

    expect(mockManager.subscribe).toHaveBeenCalled();

    unmount();

    expect(unsubscribeMock).toHaveBeenCalled();
  });

  it('should react to external changes via subscription', () => {
    render(<DarkModeTestHarness manager={mockManager} />);

    const status = screen.getByTestId('dark-mode-status');
    expect(status.textContent).toBe('light');

    act(() => {
      listeners.forEach(listener => listener(true));
    });

    expect(status.textContent).toBe('dark');
  });

  it('should sync state across multiple hook instances with same manager', () => {
    render(
      <div>
        <DarkModeTestHarness manager={mockManager} />
        <DarkModeTestHarness manager={mockManager} />
      </div>
    );

    const statuses = screen.getAllByTestId('dark-mode-status');
    const toggleButtons = screen.getAllByRole('button', { name: /toggle dark mode/i });

    expect(statuses[0].textContent).toBe('light');
    expect(statuses[1].textContent).toBe('light');

    fireEvent.click(toggleButtons[0]);

    expect(statuses[0].textContent).toBe('dark');
    expect(statuses[1].textContent).toBe('dark');

    fireEvent.click(toggleButtons[1]);

    expect(statuses[0].textContent).toBe('light');
    expect(statuses[1].textContent).toBe('light');
  });

  it('should call togglePreference when toggleDarkMode is invoked', () => {
    render(<DarkModeTestHarness manager={mockManager} />);

    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });

    fireEvent.click(toggleButton);

    expect(mockManager.togglePreference).toHaveBeenCalledTimes(1);
  });
});
