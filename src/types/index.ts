// Auth Types
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

// Video Types
export enum VideoSourceType {
  UPLOADED = 'uploaded',
  YOUTUBE = 'youtube',
  VIMEO = 'vimeo',
  DIRECT_LINK = 'direct_link'
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  sourceType: VideoSourceType;
  url: string;
  thumbnailUrl?: string;
  duration?: number;
  isPublic: boolean;
  userId: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

// Sync Types
export enum ViewLayout {
  SIDE_BY_SIDE = 'side_by_side',
  STACKED = 'stacked',
  PICTURE_IN_PICTURE = 'picture_in_picture',
  GRID = 'grid'
}

export enum SyncState {
  UNSYNCHRONIZED = 'unsynchronized',
  SYNCING = 'syncing',
  SYNCHRONIZED = 'synchronized'
}

export interface SyncProfile {
  id: string;
  name: string;
  description?: string;
  defaultLayout: ViewLayout;
  reactionVideoUrl?: string;
  externalVideoUrl?: string;
  timeOffset: number;
  playbackSpeed: number;
  reactionVolume: number;
  externalVolume: number;
  syncNotes?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SyncSession {
  id: string;
  name?: string;
  layout: ViewLayout;
  timeOffset: number;
  playbackSpeed: number;
  reactionVolume: number;
  externalVolume: number;
  reactionPosition: number;
  externalPosition: number;
  timestampStart?: number;
  countdownStart: boolean;
  syncState: SyncState;
  isPublic: boolean;
  shareableLink?: string;
  viewCount: number;
  userId: string;
  reactionVideo: Video;
  externalVideo: Video;
  createdAt: string;
  updatedAt: string;
}

// API Request Types
export interface CreateVideoRequest {
  title: string;
  description?: string;
  sourceType: VideoSourceType;
  url: string;
  isPublic?: boolean;
}

export interface CreateSyncProfileRequest {
  name: string;
  description?: string;
  defaultLayout?: ViewLayout;
  reactionVideoUrl?: string;
  externalVideoUrl?: string;
  timeOffset?: number;
  playbackSpeed?: number;
  reactionVolume?: number;
  externalVolume?: number;
  syncNotes?: string;
}

export interface CreateSyncSessionRequest {
  name?: string;
  layout?: ViewLayout;
  reactionVideoId: string;
  externalVideoId: string;
  timeOffset?: number;
  playbackSpeed?: number;
  reactionVolume?: number;
  externalVolume?: number;
  isPublic?: boolean;
}

export interface UpdateSyncSessionRequest {
  name?: string;
  layout?: ViewLayout;
  timeOffset?: number;
  playbackSpeed?: number;
  reactionVolume?: number;
  externalVolume?: number;
  lastPosition?: number;
  reactionPosition?: number;
  externalPosition?: number;
  timestampStart?: number;
  countdownStart?: boolean;
  syncState?: SyncState;
  isPublic?: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type PaginatedResponse<T> = ApiResponse<{
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}>; 