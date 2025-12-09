

import { create } from 'zustand';

interface AppStore {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  };
  showSnackbar: (message: string, severity?: 'success' | 'error' | 'info' | 'warning') => void;
  hideSnackbar: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  snackbar: {
    open: false,
    message: '',
    severity: 'info',
  },
  showSnackbar: (message, severity = 'info') =>
    set({ snackbar: { open: true, message, severity } }),
  hideSnackbar: () =>
    set((state) => ({ snackbar: { ...state.snackbar, open: false } })),
}));
