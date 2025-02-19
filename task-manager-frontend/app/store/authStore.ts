import { create } from "zustand";

interface AuthState {
  user: unknown;
  isAuthenticated: boolean;
  login: (user: unknown) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
