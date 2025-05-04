"use client";

import { useState, useEffect } from "react";
import { useSyncStore } from "@/store/sync";
import { ViewLayout, SyncProfile } from "@/types";
import { VideoPlayer } from "@/components/VideoPlayer";
import { formatDuration, formatTimestamp } from "@/lib/utils";

interface SyncSessionManagerProps {
  sessionId?: string;
  profile?: SyncProfile;
  className?: string;
}

export function SyncSessionManager({
  sessionId,
  profile,
  className,
}: SyncSessionManagerProps) {
  const [layout, setLayout] = useState<ViewLayout>(ViewLayout.SIDE_BY_SIDE);
  const [showSettings, setShowSettings] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState<string>("");

  const syncStore = useSyncStore();
  const { currentSession, isLoading, error } = syncStore;

  useEffect(() => {
    if (sessionId) {
      syncStore.getSession(sessionId).catch(console.error);
    } else if (profile) {
      syncStore.createSessionFromProfile(profile.id).catch(console.error);
    }
  }, [sessionId, profile, syncStore]);

  const handleGenerateShareLink = async () => {
    if (!currentSession) return;

    try {
      setIsSharing(true);
      const link = await syncStore.generateShareLink(currentSession.id);
      setShareLink(link);
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsSharing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-blue-800 font-medium">Loading your session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-red-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Session</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <div className="w-20 h-20 mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-blue-500">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">No Session Available</h3>
          <p className="text-gray-600 mb-6">Create a new session or load an existing one to start syncing your videos.</p>
          <div className="flex flex-col space-y-3">
            <button className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Create New Session
            </button>
            <button className="px-4 py-3 bg-white text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors font-medium">
              Browse Recent Sessions
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full flex flex-col">
      {/* Video Player */}
      <div className="flex-1 bg-black">
        <VideoPlayer
          sessionId={currentSession.id}
          reactionVideo={currentSession.reactionVideo}
          externalVideo={currentSession.externalVideo}
          layout={layout}
          className={className}
        />
      </div>

      {/* Controls Bar */}
      <div className="bg-gray-900 p-4 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            {/* Layout Controls */}
            <div className="flex items-center rounded-lg bg-gray-800 p-1">
              <button
                onClick={() => setLayout(ViewLayout.SIDE_BY_SIDE)}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  layout === ViewLayout.SIDE_BY_SIDE
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Side by Side
              </button>
              <button
                onClick={() => setLayout(ViewLayout.STACKED)}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  layout === ViewLayout.STACKED
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Stacked
              </button>
              <button
                onClick={() => setLayout(ViewLayout.GRID)}
                className={`px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  layout === ViewLayout.GRID
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                Grid
              </button>
            </div>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>

          {/* Session Info */}
          <div className="flex items-center text-gray-300 text-sm">
            <span className="font-medium">{currentSession.name}</span>
            <span className="mx-2">•</span>
            <span>{formatTimestamp(new Date(currentSession.createdAt).getTime())}</span>
          </div>

          {/* Share Button */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleGenerateShareLink}
              disabled={isSharing}
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors font-medium"
            >
              {isSharing ? "Generating..." : "Share Session"}
            </button>
            {shareLink && (
              <div className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-md">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="bg-transparent border-none focus:outline-none text-gray-200 w-48 xl:w-64"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(shareLink)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute bottom-full left-0 right-0 bg-gray-800 text-white p-6 shadow-lg border-t border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Session Settings</h3>
            <button 
              onClick={() => setShowSettings(false)}
              className="p-1 rounded-full hover:bg-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Session Name
                </label>
                <div className="text-lg font-medium">{currentSession.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Created At
                </label>
                <div className="text-lg">
                  {formatTimestamp(new Date(currentSession.createdAt).getTime())}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Time Offset
                </label>
                <div className="text-lg">
                  {formatDuration(Math.abs(currentSession.timeOffset))}
                  <span className={currentSession.timeOffset >= 0 ? "text-green-400" : "text-yellow-400"}>
                    {currentSession.timeOffset >= 0 ? " ahead" : " behind"}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Reaction Video
                </label>
                <div className="text-lg truncate">{currentSession.reactionVideo.title || currentSession.reactionVideo.url}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Source Video
                </label>
                <div className="text-lg truncate">{currentSession.externalVideo.title || currentSession.externalVideo.url}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Session ID
                </label>
                <div className="text-sm text-gray-400">{currentSession.id}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
