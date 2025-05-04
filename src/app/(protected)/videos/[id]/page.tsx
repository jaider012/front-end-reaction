'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useVideoStore } from '@/store/video';
import { useAuthStore } from '@/store/auth';
import { useSyncStore } from '@/store/sync';
import { VideoSourceType } from '@/types';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamic import for ReactPlayer to avoid SSR issues
const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export default function VideoDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getVideo, currentVideo, isLoading, error, deleteVideo } = useVideoStore();
  const { createSession } = useSyncStore();
  const { user } = useAuthStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        await getVideo(id as string);
      } catch {
        toast.error('Failed to load video details');
      }
    };
    
    fetchVideo();
  }, [id, getVideo]);
  
  const handleCreateReactionSession = async () => {
    if (!currentVideo) return;
    
    try {
      const session = await createSession({
        name: `Reaction to: ${currentVideo.title}`,
        externalVideoId: currentVideo.id,
        // The user will need to select or upload a reaction video later
        reactionVideoId: '',
      });
      
      router.push(`/sync/setup/${session.id}`);
    } catch {
      toast.error('Failed to create reaction session');
    }
  };
  
  const handleDeleteVideo = async () => {
    if (!currentVideo || !confirmDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteVideo(currentVideo.id);
      toast.success('Video deleted successfully');
      router.push('/videos');
    } catch {
      toast.error('Failed to delete video');
    } finally {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };
  
  if (isLoading && !currentVideo) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  if (error || !currentVideo) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Video not found or unavailable. Please check the URL and try again.
        </div>
        <div className="mt-4">
          <Link 
            href="/videos"
            className="text-primary hover:underline"
          >
            Back to videos
          </Link>
        </div>
      </div>
    );
  }
  
  const isOwner = user?.id === currentVideo.userId;
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{currentVideo.title}</h1>
        
        <div className="flex space-x-4">
          <button
            onClick={handleCreateReactionSession}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow transition"
          >
            Create Reaction
          </button>
          
          {isOwner && (
            <>
              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
                >
                  Delete Video
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleDeleteVideo}
                    disabled={isDeleting}
                    className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition ${
                      isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isDeleting ? 'Deleting...' : 'Confirm Delete'}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow transition"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
        <div className="aspect-video w-full">
          <ReactPlayer
            url={currentVideo.url}
            width="100%"
            height="100%"
            controls
            playing
            config={{
              youtube: {
                playerVars: { showinfo: 1 }
              },
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {currentVideo.description || 'No description provided.'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>
            <p className="text-gray-500 italic">Comments feature coming soon.</p>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Video Information</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-500">Uploaded On</h3>
                <p>{new Date(currentVideo.createdAt).toLocaleDateString()}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Views</h3>
                <p>{currentVideo.viewCount}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500">Source Type</h3>
                <p>{formatSourceType(currentVideo.sourceType)}</p>
              </div>
              
              {currentVideo.duration && (
                <div>
                  <h3 className="text-sm text-gray-500">Duration</h3>
                  <p>{formatDuration(currentVideo.duration)}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-sm text-gray-500">Visibility</h3>
                <p>{currentVideo.isPublic ? 'Public' : 'Private'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    case VideoSourceType.UPLOADED:
      return 'Uploaded File';
    default:
      return 'Unknown';
  }
} 