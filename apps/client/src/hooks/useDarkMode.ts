import { useState, useEffect } from 'react';

export interface UseDarkModeReturn {
  isDark: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export function useDarkMode(): UseDarkModeReturn {
  // Initialize from localStorage or system preference
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      return stored === 'true';
    }
    // Fall back to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update DOM and localStorage when dark mode changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  // Listen for system preference changes (only if no localStorage preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user hasn't set a preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const setDarkMode = (value: boolean) => {
    setIsDark(value);
  };

  return { isDark, toggleDarkMode, setDarkMode };
}
