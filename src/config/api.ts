/**
 * API Configuration
 */

// Base URL for the API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  PROFILE: '/auth/profile',

  // Videos
  VIDEOS: '/videos',
  VIDEO_BY_ID: (id: string) => `/videos/${id}`,
  VIDEO_UPLOAD: '/videos/upload',
  VIDEO_SEARCH: '/videos/search',

  // Sync Profiles
  SYNC_PROFILES: '/sync/profiles',
  SYNC_PROFILE_BY_ID: (id: string) => `/sync/profiles/${id}`,
  SYNC_PROFILE_CREATE: '/sync/profiles',
  SYNC_PROFILE_UPDATE: (id: string) => `/sync/profiles/${id}`,
  SYNC_PROFILE_DELETE: (id: string) => `/sync/profiles/${id}`,

  // Sync Sessions
  SYNC_SESSIONS: '/sync/sessions',
  SYNC_SESSION_BY_ID: (id: string) => `/sync/sessions/${id}`,
  SYNC_SESSION_CREATE: '/sync/sessions',
  SYNC_SESSION_UPDATE: (id: string) => `/sync/sessions/${id}`,
  SYNC_SESSION_DELETE: (id: string) => `/sync/sessions/${id}`,
  SYNC_SESSION_SHARE: (id: string) => `/sync/sessions/${id}/share`,
  SYNC_SESSION_JOIN: (id: string) => `/sync/sessions/${id}/join`,
  SYNC_SESSION_LEAVE: (id: string) => `/sync/sessions/${id}/leave`,
  SYNC_SESSION_START: (id: string) => `/sync/sessions/${id}/start`,
  SYNC_SESSION_STOP: (id: string) => `/sync/sessions/${id}/stop`,
  SYNC_SESSION_SEEK: (id: string) => `/sync/sessions/${id}/seek`,
  SYNC_SESSION_SYNC: (id: string) => `/sync/sessions/${id}/sync`,
} as const;

// API Request Timeouts (in milliseconds)
export const API_TIMEOUTS = {
  DEFAULT: 10000, // 10 seconds
  UPLOAD: 300000, // 5 minutes
  DOWNLOAD: 300000, // 5 minutes
} as const;

// API Response Status Codes
export const API_STATUS = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
} as const;

// API Error Messages
export const API_ERRORS = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// API Headers
export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
} as const;

// API Authentication
export const AUTH_CONFIG = {
  TOKEN_KEY: 'auth_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  TOKEN_EXPIRY: 3600, // 1 hour in seconds
} as const;

// API Rate Limiting
export const RATE_LIMIT = {
  MAX_REQUESTS: 100, // Maximum number of requests
  TIME_WINDOW: 60000, // Time window in milliseconds (1 minute)
} as const;

// API Feature Flags
export const API_FEATURES = {
  ENABLE_CACHING: true,
  ENABLE_RETRY: true,
  ENABLE_RATE_LIMITING: true,
  ENABLE_ERROR_REPORTING: true,
} as const;

// API Cache Configuration
export const CACHE_CONFIG = {
  TTL: 300, // Time to live in seconds (5 minutes)
  MAX_SIZE: 100, // Maximum number of items in cache
} as const;

// API Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // Delay between retries in milliseconds
  RETRY_STATUS_CODES: [408, 500, 502, 503, 504], // Status codes to retry on
} as const; 