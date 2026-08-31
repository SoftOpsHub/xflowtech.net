import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  mobileNavOpen: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setMobileNavOpen: (open: boolean) => void;
}

// Reference Zustand store — client UI state that needs no Provider. Add one
// store file per concern under src/store/; keep server-free (this site has
// no backend).
export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  mobileNavOpen: false,
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
