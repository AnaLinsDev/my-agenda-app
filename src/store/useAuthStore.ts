import { create } from "zustand";
import { getUserProfile } from "../services/userService";

type User = {
  id: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;

  checkAuth: () => Promise<void>;
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  checkAuth: async () => {
    try {
      const user = await getUserProfile();
      set({
        user,
        isAuthenticated: true,
      });
    } catch {
      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({ loading: false });
    }
  },
}));