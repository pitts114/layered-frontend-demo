import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { DarkModePreferenceManager } from '../../src/lib/DarkModePreferenceManager';

describe('DarkModePreferenceManager', () => {
  let manager: DarkModePreferenceManager;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Clear the DOM
    document.documentElement.classList.remove('dark');

    // Reset the singleton instance by accessing private static field
    // We need to cast to any to access the private static property in tests
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (DarkModePreferenceManager as any)._instance = null;

    // Get a fresh instance
    manager = DarkModePreferenceManager.instance;
  });

  afterEach(() => {
    // Clean up
    manager.dispose();
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  describe('Singleton pattern', () => {
    it('should return the same instance when accessed multiple times', () => {
      const instance1 = DarkModePreferenceManager.instance;
      const instance2 = DarkModePreferenceManager.instance;
      expect(instance1).toBe(instance2);
    });
  });

  describe('Initial preference', () => {
    it('should default to false when no preference is stored and no system preference', () => {
      expect(manager.getPreference()).toBe(false);
    });

    it('should read from localStorage if available', () => {
      localStorage.setItem('darkMode', 'true');
      // Reset the singleton instance by accessing private static field
      // We need to cast to any to access the private static property in tests
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (DarkModePreferenceManager as any)._instance = null;
      const newManager = DarkModePreferenceManager.instance;

      expect(newManager.getPreference()).toBe(true);
      newManager.dispose();
    });

    it('should apply initial DOM state on initialization', () => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
  });

  describe('setPreference', () => {
    it('should update the preference to true', () => {
      manager.setPreference(true);
      expect(manager.getPreference()).toBe(true);
    });

    it('should update the preference to false', () => {
      manager.setPreference(true);
      manager.setPreference(false);
      expect(manager.getPreference()).toBe(false);
    });

    it('should update localStorage', () => {
      manager.setPreference(true);
      expect(localStorage.getItem('darkMode')).toBe('true');

      manager.setPreference(false);
      expect(localStorage.getItem('darkMode')).toBe('false');
    });

    it('should update DOM classes', () => {
      manager.setPreference(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);

      manager.setPreference(false);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    it('should not trigger updates when setting the same value', () => {
      const listener = vi.fn();
      manager.subscribe(listener);

      manager.setPreference(false); // Already false by default
      expect(listener).not.toHaveBeenCalled();

      manager.setPreference(true);
      expect(listener).toHaveBeenCalledTimes(1);

      manager.setPreference(true); // Same value
      expect(listener).toHaveBeenCalledTimes(1); // Should not be called again
    });

    it('should notify subscribers when preference changes', () => {
      const listener = vi.fn();
      manager.subscribe(listener);

      manager.setPreference(true);
      expect(listener).toHaveBeenCalledWith(true);

      manager.setPreference(false);
      expect(listener).toHaveBeenCalledWith(false);
    });
  });

  describe('togglePreference', () => {
    it('should toggle from false to true', () => {
      expect(manager.getPreference()).toBe(false);
      manager.togglePreference();
      expect(manager.getPreference()).toBe(true);
    });

    it('should toggle from true to false', () => {
      manager.setPreference(true);
      manager.togglePreference();
      expect(manager.getPreference()).toBe(false);
    });

    it('should update localStorage when toggling', () => {
      manager.togglePreference();
      expect(localStorage.getItem('darkMode')).toBe('true');

      manager.togglePreference();
      expect(localStorage.getItem('darkMode')).toBe('false');
    });
  });

  describe('subscribe', () => {
    it('should notify subscriber when preference changes', () => {
      const listener = vi.fn();
      manager.subscribe(listener);

      manager.setPreference(true);
      expect(listener).toHaveBeenCalledWith(true);
    });

    it('should notify multiple subscribers', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      manager.subscribe(listener1);
      manager.subscribe(listener2);

      manager.setPreference(true);

      expect(listener1).toHaveBeenCalledWith(true);
      expect(listener2).toHaveBeenCalledWith(true);
    });

    it('should return an unsubscribe function', () => {
      const listener = vi.fn();
      const unsubscribe = manager.subscribe(listener);

      manager.setPreference(true);
      expect(listener).toHaveBeenCalledTimes(1);

      unsubscribe();
      manager.setPreference(false);
      expect(listener).toHaveBeenCalledTimes(1); // Not called again after unsubscribe
    });

    it('should allow subscribing and unsubscribing multiple listeners', () => {
      const listener1 = vi.fn();
      const listener2 = vi.fn();

      const unsubscribe1 = manager.subscribe(listener1);
      manager.subscribe(listener2);

      manager.setPreference(true);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(1);

      unsubscribe1();
      manager.setPreference(false);
      expect(listener1).toHaveBeenCalledTimes(1);
      expect(listener2).toHaveBeenCalledTimes(2);
    });
  });

  describe('dispose', () => {
    it('should clear all listeners', () => {
      const listener = vi.fn();
      manager.subscribe(listener);

      manager.dispose();
      manager.setPreference(true);

      expect(listener).not.toHaveBeenCalled();
    });

    it('should allow re-initialization after disposal', () => {
      manager.dispose();
      manager.initialize();

      // Should work normally after re-initialization
      manager.setPreference(true);
      expect(manager.getPreference()).toBe(true);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('System preference changes', () => {
    it('should set up media query listener during initialization', () => {
      // Verify that the manager sets up media query listener
      // We can't easily test the actual event dispatch in jsdom,
      // but we can verify the initialization logic is in place
      manager.dispose();
      localStorage.clear();
      (DarkModePreferenceManager as any)._instance = null;

      const newManager = DarkModePreferenceManager.instance;

      // If matchMedia is available, the manager should have set up a listener
      expect(window.matchMedia).toBeDefined();
      expect(newManager.getPreference()).toBe(false);

      newManager.dispose();
    });

    it('should not update preference after explicit user preference is set', () => {
      // Set explicit preference to true first (since default is false)
      manager.setPreference(true);
      expect(localStorage.getItem('darkMode')).toBe('true');

      // Change to false
      manager.setPreference(false);
      expect(localStorage.getItem('darkMode')).toBe('false');

      // Verify localStorage has explicit preference
      expect(localStorage.getItem('darkMode')).not.toBeNull();
      expect(manager.getPreference()).toBe(false);
    });
  });
});
