'use client';

import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useVideoStore } from '@/store/video';
import { VideoSourceType } from '@/types';
import { toast } from 'react-hot-toast';

export default function UploadPage() {
  const router = useRouter();
  const { uploadVideo, createVideo, isLoading } = useVideoStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [uploadType, setUploadType] = useState<'file' | 'youtube' | 'url'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSourceTypeChange = (type: 'file' | 'youtube' | 'url') => {
    setUploadType(type);
    // Reset values
    setFile(null);
    setVideoUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      if (uploadType === 'file') {
        if (!file) {
          toast.error('Please select a file to upload');
          return;
        }

        await uploadVideo(
          file,
          title,
          description,
          isPublic,
          (progress) => setUploadProgress(progress)
        );
        toast.success('Video uploaded successfully');
      } else {
        if (!videoUrl.trim()) {
          toast.error('Please enter a video URL');
          return;
        }

        const sourceType = uploadType === 'youtube' 
          ? VideoSourceType.YOUTUBE 
          : VideoSourceType.DIRECT_LINK;

        await createVideo({
          title,
          description,
          sourceType,
          url: videoUrl,
          isPublic
        });
        toast.success('Video added successfully');
      }

      router.push('/videos');
    } catch {
      toast.error('Failed to upload video');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Upload Video</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => handleSourceTypeChange('file')}
            className={`px-4 py-2 rounded ${
              uploadType === 'file'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Upload File
          </button>
          <button
            type="button"
            onClick={() => handleSourceTypeChange('youtube')}
            className={`px-4 py-2 rounded ${
              uploadType === 'youtube'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            YouTube Video
          </button>
          <button
            type="button"
            onClick={() => handleSourceTypeChange('url')}
            className={`px-4 py-2 rounded ${
              uploadType === 'url'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Direct URL
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {uploadType === 'file' ? (
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Video File <span className="text-red-500">*</span>
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="file"
                accept="video/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {uploadProgress > 0 && (
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 mt-1">{uploadProgress}% Uploaded</span>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Video URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={
                  uploadType === 'youtube'
                    ? 'https://www.youtube.com/watch?v=...'
                    : 'https://example.com/video.mp4'
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          )}

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-700">
              Make video public
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/videos')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-primary ${
                isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-dark'
              }`}
            >
              {isLoading ? 'Uploading...' : 'Upload Video'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 