import { create } from 'zustand';
import { api } from '@/services/api';
import {
  ApiResponse,
  Video,
  CreateVideoRequest,
  VideoSourceType,
  PaginatedResponse,
} from '@/types';

interface VideoStore {
  // State
  videos: Video[];
  currentVideo: Video | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };

  // Methods
  getVideos: (page?: number, limit?: number) => Promise<Video[]>;
  getUserVideos: (userId: string, page?: number, limit?: number) => Promise<Video[]>;
  getVideo: (id: string) => Promise<Video>;
  createVideo: (data: CreateVideoRequest) => Promise<Video>;
  updateVideo: (id: string, data: Partial<CreateVideoRequest>) => Promise<Video>;
  deleteVideo: (id: string) => Promise<void>;
  uploadVideo: (file: File, title: string, description?: string, isPublic?: boolean, onProgress?: (progress: number) => void) => Promise<Video>;
  searchVideos: (query: string, page?: number, limit?: number) => Promise<Video[]>;
  getYoutubeVideo: (youtubeUrl: string) => Promise<Video>;
}

export const useVideoStore = create<VideoStore>()((set, get) => ({
  // Initial state
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },

  // Methods
  getVideos: async (page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<PaginatedResponse<Video>>('/videos', {
        page,
        limit,
      });
      
      set({ 
        videos: response.data.items,
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

  getUserVideos: async (userId, page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<PaginatedResponse<Video>>(`/users/${userId}/videos`, {
        page,
        limit,
      });
      
      set({ 
        videos: response.data.items,
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

  getVideo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<ApiResponse<Video>>(`/videos/${id}`);
      const video = response.data;
      set({ currentVideo: video });
      return video;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  createVideo: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<Video>>('/videos', data);
      const video = response.data;
      return video;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  updateVideo: async (id, data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.put<ApiResponse<Video>>(`/videos/${id}`, data);
      const video = response.data;
      
      // Update current video if it's the one being updated
      if (get().currentVideo?.id === id) {
        set({ currentVideo: video });
      }
      
      // Update in videos list if present
      const updatedVideos = get().videos.map(v => 
        v.id === id ? video : v
      );
      set({ videos: updatedVideos });
      
      return video;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteVideo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await api.delete<ApiResponse<void>>(`/videos/${id}`);
      
      // Remove from videos list
      const updatedVideos = get().videos.filter(v => v.id !== id);
      set({ videos: updatedVideos });
      
      // Clear current video if it's the one being deleted
      if (get().currentVideo?.id === id) {
        set({ currentVideo: null });
      }
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  uploadVideo: async (file, title, description = '', isPublic = false, onProgress) => {
    set({ isLoading: true, error: null });
    try {
      // First upload the file
      const uploadResponse = await api.upload<{ url: string }>('/videos/upload', file, onProgress);
      
      // Then create the video entry
      const videoData: CreateVideoRequest = {
        title,
        description,
        sourceType: VideoSourceType.UPLOADED,
        url: uploadResponse.url,
        isPublic
      };
      
      const response = await api.post<ApiResponse<Video>>('/videos', videoData);
      const video = response.data;
      return video;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  searchVideos: async (query, page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<PaginatedResponse<Video>>('/videos/search', {
        query,
        page,
        limit
      });
      
      set({ 
        videos: response.data.items,
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

  getYoutubeVideo: async (youtubeUrl) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post<ApiResponse<Video>>('/videos/youtube', { url: youtubeUrl });
      return response.data;
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
})); 