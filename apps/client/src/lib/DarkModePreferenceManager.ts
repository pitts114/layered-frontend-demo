type PreferenceChangeListener = (isDark: boolean) => void;

export class DarkModePreferenceManager {
  private static _instance: DarkModePreferenceManager | null = null;

  private isDark: boolean;
  private listeners: Set<PreferenceChangeListener>;
  private mediaQuery: MediaQueryList | null;
  private mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null;
  private readonly storageKey = 'darkMode';
  private initialized = false;

  private constructor() {
    this.listeners = new Set();
    this.mediaQuery = null;
    this.mediaQueryHandler = null;

    this.isDark = this.readInitialPreference();
  }

  static get instance(): DarkModePreferenceManager {
    if (!DarkModePreferenceManager._instance) {
      DarkModePreferenceManager._instance = new DarkModePreferenceManager();
      DarkModePreferenceManager._instance.initialize();
    }
    return DarkModePreferenceManager._instance;
  }

  private readInitialPreference(): boolean {
    const stored = localStorage.getItem(this.storageKey);
    if (stored !== null) {
      return stored === 'true';
    }

    if (window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    return false;
  }

  getPreference(): boolean {
    return this.isDark;
  }

  setPreference(isDark: boolean): void {
    if (this.isDark === isDark) {
      return;
    }

    this.isDark = isDark;

    localStorage.setItem(this.storageKey, String(isDark));

    this.updateDOM(isDark);

    this.notifyListeners(isDark);
  }

  togglePreference(): void {
    this.setPreference(!this.isDark);
  }

  subscribe(listener: PreferenceChangeListener): () => void {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  initialize(): void {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    this.updateDOM(this.isDark);

    if (window.matchMedia) {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQueryHandler = (e: MediaQueryListEvent) => {
        if (localStorage.getItem(this.storageKey) === null) {
          this.isDark = e.matches;
          this.updateDOM(e.matches);
          this.notifyListeners(e.matches);
        }
      };

      this.mediaQuery.addEventListener('change', this.mediaQueryHandler);
    }
  }

  dispose(): void {
    if (this.mediaQuery && this.mediaQueryHandler) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
    }

    this.listeners.clear();
    this.initialized = false;
  }

  private updateDOM(isDark: boolean): void {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }

  private notifyListeners(isDark: boolean): void {
    this.listeners.forEach(listener => {
      listener(isDark);
    });
  }
}
