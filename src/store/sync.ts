import { create } from 'zustand';
import { api } from '@/services/api';
import {
  ApiResponse,
  SyncSession,
  SyncProfile,
  CreateSyncSessionRequest,
  UpdateSyncSessionRequest,
  CreateSyncProfileRequest,
  SyncState,
} from '@/types';

interface SyncStore {
  // State
  currentSession: SyncSession | null;
  isLoading: boolean;
  error: string | null;

  // Session methods
  createSession: (data: CreateSyncSessionRequest) => Promise<SyncSession>;
  getSession: (id: string) => Promise<SyncSession>;
  updateSession: (id: string, data: UpdateSyncSessionRequest) => Promise<SyncSession>;
  deleteSession: (id: string) => Promise<void>;
  getSharedSession: (shareCode: string) => Promise<SyncSession>;
  generateShareLink: (id: string) => Promise<string>;

  // Sync control methods
  startCountdownSync: (id: string) => Promise<SyncSession>;
  setTimestampSync: (id: string, timestamp: number) => Promise<SyncSession>;
  updatePositions: (
    id: string,
    reactionPosition: number,
    externalPosition: number
  ) => Promise<{
    syncState: SyncState;
    reactionPosition: number;
    externalPosition: number;
  }>;

  // Profile methods
  createProfile: (data: CreateSyncProfileRequest) => Promise<SyncProfile>;
  getProfile: (id: string) => Promise<SyncProfile>;
  updateProfile: (id: string, data: Partial<CreateSyncProfileRequest>) => Promise<SyncProfile>;
  deleteProfile: (id: string) => Promise<void>;
  createSessionFromProfile: (profileId: string) => Promise<SyncSession>;
}

export const useSyncStore = create<SyncStore>()((set, get) => ({
  // Initial state
  currentSession: null,
  isLoading: false,
  error: null,

  // Session methods
  createSession: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<SyncSession>>('/sync/sessions', data);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getSession: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<SyncSession>>(`/sync/sessions/${id}`);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateSession: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put<ApiResponse<SyncSession>>(`/sync/sessions/${id}`, data);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteSession: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete<ApiResponse<void>>(`/sync/sessions/${id}`);
      if (get().currentSession?.id === id) {
        set({ currentSession: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getSharedSession: async (shareCode) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<SyncSession>>(`/sync/shared/${shareCode}`);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  generateShareLink: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<{ shareableLink: string }>>(`/sync/sessions/${id}/share`);
      return response.data.shareableLink;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  // Sync control methods
  startCountdownSync: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<SyncSession>>(`/sync/sessions/${id}/countdown`);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  setTimestampSync: async (id, timestamp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<SyncSession>>(`/sync/sessions/${id}/timestamp`, { timestamp });
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updatePositions: async (id, reactionPosition, externalPosition) => {
    try {
      const response = await api.post<ApiResponse<{
        syncState: SyncState;
        reactionPosition: number;
        externalPosition: number;
      }>>(`/sync/sessions/${id}/positions`, {
        reactionPosition,
        externalPosition,
      });
      return response.data;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  // Profile methods
  createProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<SyncProfile>>('/sync/profiles', data);
      return response.data;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  getProfile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<SyncProfile>>(`/sync/profiles/${id}`);
      return response.data;
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
      const response = await api.put<ApiResponse<SyncProfile>>(`/sync/profiles/${id}`, data);
      return response.data;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProfile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete<ApiResponse<void>>(`/sync/profiles/${id}`);
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createSessionFromProfile: async (profileId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<SyncSession>>(`/sync/profiles/${profileId}/create-session`);
      const session = response.data;
      set({ currentSession: session });
      return session;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
})); 