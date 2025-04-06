import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../services/api";
import {
  User,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  ApiResponse,
} from "../types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await api.post<ApiResponse<AuthResponse>>(
            "/auth/login",
            credentials
          );
          const { token, user } = response.data;
          set({ user, token, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await api.post<ApiResponse<AuthResponse>>(
            "/auth/register",
            credentials
          );
          const { token, user } = response.data;
          set({ user, token, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      getProfile: async () => {
        set({ isLoading: true });
        try {
          const response = await api.get<ApiResponse<User>>("/auth/me");
          set({ user: response.data, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
