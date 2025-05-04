'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';
import { useVideoStore } from '@/store/video';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { updateProfile, isLoading: isProfileLoading } = useUserStore();
  const { getUserVideos, videos, isLoading: isVideosLoading } = useVideoStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (typeof window !== 'undefined' && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);
  
  // Set initial values
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);
  
  // Load user videos
  useEffect(() => {
    const loadVideos = async () => {
      if (user) {
        try {
          await getUserVideos(user.id);
        } catch {
          toast.error('Failed to load your videos');
        }
      }
    };
    
    loadVideos();
  }, [user, getUserVideos]);
  
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    try {
      if (!user) return;
      
      const updateData = {
        username,
        email,
        ...(newPassword ? { currentPassword, newPassword } : {})
      };
      
      await updateProfile(user.id, updateData);
      toast.success('Profile updated successfully');
      setIsEditing(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      toast.error('Failed to update profile');
    }
  };
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-bold">
                {user.username.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              {!isEditing ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Username</h3>
                    <p>{user.username}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Email</h3>
                    <p>{user.email}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Member Since</h3>
                    <p>{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="pt-4 flex space-x-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
                    >
                      Edit Profile
                    </button>
                    
                    <button
                      onClick={() => {
                        logout();
                        router.push('/');
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h3 className="text-md font-semibold mb-2">Change Password (Optional)</h3>
                    
                    <div>
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 pt-2">
                    <button
                      type="submit"
                      disabled={isProfileLoading}
                      className={`bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition ${
                        isProfileLoading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProfileLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset to original values
                        if (user) {
                          setUsername(user.username);
                          setEmail(user.email);
                        }
                        setCurrentPassword('');
                        setNewPassword('');
                        setConfirmPassword('');
                      }}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded shadow transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">My Videos</h2>
              <Link 
                href="/videos/upload" 
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
              >
                Upload New Video
              </Link>
            </div>
            
            {isVideosLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : videos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">You haven&apos;t uploaded any videos yet.</p>
                <Link 
                  href="/videos/upload" 
                  className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded shadow transition"
                >
                  Upload Your First Video
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video }: { video: Video }) {
  const thumbnailUrl = video.thumbnailUrl || '/placeholder-video.jpg';
  
  return (
    <Link 
      href={`/videos/${video.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
    >
      <div className="relative aspect-video">
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{video.title}</h3>
        <p className="text-gray-500 text-sm">{formatDate(video.createdAt)}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600">{video.viewCount} views</span>
          <span className={`text-xs px-2 py-1 rounded ${video.isPublic ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {video.isPublic ? 'Public' : 'Private'}
          </span>
        </div>
      </div>
    </Link>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
} 