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
  isInitialized: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  getProfile: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isInitialized: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<ApiResponse<AuthResponse>>(
            "/api/auth/login",
            credentials
          );
          const { token, user } = response.data;
          
          localStorage.setItem("token", token);
          
          set({ 
            user, 
            token, 
            isAuthenticated: true, 
            isInitialized: true 
          });
        } catch (error) {
          set({ 
            error: (error as Error).message || "Error al iniciar sesión" 
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<ApiResponse<AuthResponse>>(
            "/api/auth/register",
            credentials
          );
          const { token, user } = response.data;
          
          localStorage.setItem("token", token);
          
          set({ 
            user, 
            token, 
            isAuthenticated: true,
            isInitialized: true
          });
        } catch (error) {
          set({ 
            error: (error as Error).message || "Error al registrar usuario" 
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false,
          error: null
        });
      },

      getProfile: async () => {
        if (!get().token) {
          set({ isInitialized: true });
          return;
        }
        
        set({ isLoading: true, error: null });
        try {
          const response = await api.get<ApiResponse<User>>("/api/auth/me");
          set({ 
            user: response.data, 
            isAuthenticated: true,
            isInitialized: true
          });
        } catch (error) {
          get().logout();
          set({ 
            error: (error as Error).message || "Error al obtener perfil",
            isInitialized: true
          });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },
      
      checkAuth: async () => {
        const { token, isAuthenticated, isInitialized } = get();
        
        if (isInitialized) {
          return isAuthenticated;
        }
        
        if (token && !isAuthenticated) {
          try {
            await get().getProfile();
            return true;
          } catch {
            return false;
          }
        }
        
        set({ isInitialized: true });
        return isAuthenticated;
      },
      
      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token }),
    }
  )
);
