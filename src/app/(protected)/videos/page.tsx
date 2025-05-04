'use client';

import { useState, useEffect, useCallback } from 'react';
import { useVideoStore } from '@/store/video';
import { useAuthStore } from '@/store/auth';
import Link from 'next/link';
import Image from 'next/image';
import { Video, VideoSourceType } from '@/types';
import { toast } from 'react-hot-toast';

export default function VideosPage() {
  const { videos, isLoading, error, getVideos, pagination } = useVideoStore();
  const { isAuthenticated } = useAuthStore();
  const [page, setPage] = useState(1);
  
  const loadVideos = useCallback(async (pageNumber: number) => {
    try {
      await getVideos(pageNumber);
    } catch {
      toast.error('Failed to load videos');
    }
  }, [getVideos]);
  
  useEffect(() => {
    loadVideos(page);
  }, [page, loadVideos]);
  
  const handleNextPage = () => {
    if (page < pagination.total / pagination.limit) {
      setPage(page + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  
  if (isLoading && videos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Videos</h1>
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error && videos.length === 0) {
    return (
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Videos</h1>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading videos. Please try again later.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Videos</h1>
        {isAuthenticated && (
          <Link 
            href="/videos/upload"
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
          >
            Upload Video
          </Link>
        )}
      </div>
      
      {videos.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 p-8 rounded text-center">
          <p className="text-xl text-gray-600">No videos found</p>
          {isAuthenticated && (
            <Link 
              href="/videos/upload"
              className="mt-4 inline-block bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
            >
              Upload your first video
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
          
          <div className="mt-8 flex justify-between">
            <button
              onClick={handlePrevPage}
              disabled={page <= 1}
              className={`px-4 py-2 rounded ${
                page <= 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            <span className="py-2">
              Page {page} of {Math.ceil(pagination.total / pagination.limit)}
            </span>
            
            <button
              onClick={handleNextPage}
              disabled={page >= Math.ceil(pagination.total / pagination.limit)}
              className={`px-4 py-2 rounded ${
                page >= Math.ceil(pagination.total / pagination.limit)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = video.thumbnailUrl || '/placeholder-video.jpg';
  
  return (
    <Link 
      href={`/videos/${video.id}`}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
        {video.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        )}
        
        {video.sourceType !== VideoSourceType.UPLOADED && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
            {formatSourceType(video.sourceType)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{video.title}</h3>
        <p className="text-gray-500 text-sm">{formatDate(video.createdAt)}</p>
        <div className="flex items-center mt-2">
          <span className="text-sm text-gray-600">{video.viewCount} views</span>
        </div>
      </div>
    </Link>
  );
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatSourceType(type: VideoSourceType): string {
  switch (type) {
    case VideoSourceType.YOUTUBE:
      return 'YouTube';
    case VideoSourceType.VIMEO:
      return 'Vimeo';
    case VideoSourceType.DIRECT_LINK:
      return 'External Link';
    default:
      return '';
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
} 