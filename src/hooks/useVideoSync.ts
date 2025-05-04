"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSyncStore } from "../store/sync";
import { SyncState } from "../types";
import { toast } from "react-hot-toast";

export function useVideoSync(sessionId: string) {
  // Refs for video elements
  const reactionVideoRef = useRef<HTMLVideoElement>(null);
  const externalVideoRef = useRef<HTMLVideoElement>(null);

  // Local state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Sync store
  const syncStore = useSyncStore();
  const session = syncStore.currentSession;

  // Interval ref for position updates
  const positionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load session
  useEffect(() => {
    syncStore.getSession(sessionId).catch((error) => {
      toast.error("Failed to load sync session");
      console.error(error);
    });

    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
  }, [sessionId, syncStore]);

  // Start position tracking when playing
  useEffect(() => {
    if (
      !isPlaying ||
      !session ||
      !reactionVideoRef.current ||
      !externalVideoRef.current
    ) {
      return;
    }

    positionIntervalRef.current = setInterval(() => {
      const reactionPos = reactionVideoRef.current?.currentTime || 0;
      const externalPos = externalVideoRef.current?.currentTime || 0;

      syncStore
        .updatePositions(sessionId, reactionPos, externalPos)
        .catch(console.error);
    }, 1000);

    return () => {
      if (positionIntervalRef.current) {
        clearInterval(positionIntervalRef.current);
      }
    };
  }, [isPlaying, session, sessionId, syncStore]);

  // Sync playback state between videos
  const handlePlay = useCallback(() => {
    if (reactionVideoRef.current && externalVideoRef.current) {
      reactionVideoRef.current.play();
      externalVideoRef.current.play();
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (reactionVideoRef.current && externalVideoRef.current) {
      reactionVideoRef.current.pause();
      externalVideoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  // Sync seeking between videos
  const handleTimeUpdate = useCallback(
    (isReaction: boolean) => {
      if (isSeeking || !session) return;

      setIsSeeking(true);
      const sourceVideo = isReaction
        ? reactionVideoRef.current
        : externalVideoRef.current;
      const targetVideo = isReaction
        ? externalVideoRef.current
        : reactionVideoRef.current;

      if (!sourceVideo || !targetVideo) {
        setIsSeeking(false);
        return;
      }

      const offset = isReaction ? -session.timeOffset : session.timeOffset;
      targetVideo.currentTime = sourceVideo.currentTime + offset;
      setIsSeeking(false);
    },
    [session, isSeeking]
  );

  // Sync volume
  const setVolume = useCallback((isReaction: boolean, volume: number) => {
    const video = isReaction
      ? reactionVideoRef.current
      : externalVideoRef.current;
    if (video) {
      video.volume = volume / 100;
    }
  }, []);

  // Sync playback rate
  const setPlaybackRate = useCallback((rate: number) => {
    if (reactionVideoRef.current && externalVideoRef.current) {
      reactionVideoRef.current.playbackRate = rate;
      externalVideoRef.current.playbackRate = rate;
    }
  }, []);

  // Skip both videos
  const skipTime = useCallback((seconds: number) => {
    if (reactionVideoRef.current && externalVideoRef.current) {
      reactionVideoRef.current.currentTime += seconds;
      externalVideoRef.current.currentTime += seconds;
    }
  }, []);

  // Start countdown sync
  const startCountdownSync = useCallback(async () => {
    try {
      await syncStore.startCountdownSync(sessionId);

      // Start countdown
      setCountdown(3);
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(countdownInterval);
            handlePlay();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to start countdown sync");
      console.error(error);
    }
  }, [sessionId, handlePlay, syncStore]);

  // Set timestamp sync
  const setTimestampSync = useCallback(
    async (timestamp: number) => {
      try {
        await syncStore.setTimestampSync(sessionId, timestamp);

        if (reactionVideoRef.current && externalVideoRef.current) {
          reactionVideoRef.current.currentTime = timestamp;
          externalVideoRef.current.currentTime =
            timestamp - (session?.timeOffset || 0);
        }
      } catch (error) {
        toast.error("Failed to set timestamp sync");
        console.error(error);
      }
    },
    [sessionId, session, syncStore]
  );

  return {
    // Refs
    reactionVideoRef,
    externalVideoRef,

    // State
    isPlaying,
    countdown,
    session,
    syncState: session?.syncState || SyncState.UNSYNCHRONIZED,

    // Controls
    handlePlay,
    handlePause,
    handleTimeUpdate,
    setVolume,
    setPlaybackRate,
    skipTime,
    startCountdownSync,
    setTimestampSync,

    // Loading state
    isLoading: syncStore.isLoading,
    error: syncStore.error,
  };
}
