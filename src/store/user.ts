import { create } from 'zustand';
import { api } from '@/services/api';
import {
  ApiResponse,
  User,
  PaginatedResponse,
} from '@/types';

interface UserState {
  // State
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  // Methods
  getUsers: (page?: number, limit?: number) => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  updateProfile: (id: string, data: {
    username?: string;
    email?: string;
    currentPassword?: string;
    newPassword?: string;
  }) => Promise<User>;
}

export const useUserStore = create<UserState>()((set) => ({
  // Initial state
  users: [],
  currentUser: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },

  // Methods
  getUsers: async (page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<PaginatedResponse<User>>('/users', {
        page,
        limit,
      });
      
      set({ 
        users: response.data.items,
        pagination: response.data.pagination,
      });
      
      return response.data.items;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getUser: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<User>>(`/users/${id}`);
      const user = response.data;
      set({ currentUser: user });
      return user;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put<ApiResponse<User>>(`/users/${id}`, data);
      const user = response.data;
      set({ currentUser: user });
      return user;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 