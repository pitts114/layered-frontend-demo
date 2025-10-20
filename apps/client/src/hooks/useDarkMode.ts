import { useState, useEffect } from 'react';
import { DarkModePreferenceManager } from '../lib/DarkModePreferenceManager';

export interface UseDarkModeReturn {
  isDark: boolean;
  toggleDarkMode: () => void;
}

export function useDarkMode(
  manager: DarkModePreferenceManager = DarkModePreferenceManager.instance
): UseDarkModeReturn {
  const [isDark, setIsDark] = useState<boolean>(() => manager.getPreference());

  useEffect(() => {
    const unsubscribe = manager.subscribe(newIsDark => {
      setIsDark(newIsDark);
    });

    return unsubscribe;
  }, [manager]);

  const toggleDarkMode = () => {
    manager.togglePreference();
  };

  return { isDark, toggleDarkMode };
}
