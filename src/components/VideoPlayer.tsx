import ReactPlayer from "react-player";
import { useVideoSync } from "@/hooks/useVideoSync";
import { Video, ViewLayout } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface VideoPlayerProps {
  sessionId: string;
  reactionVideo: Video;
  externalVideo: Video;
  layout?: ViewLayout;
  className?: string;
}

export function VideoPlayer({
  sessionId,
  reactionVideo,
  externalVideo,
  layout = ViewLayout.SIDE_BY_SIDE,
  className,
}: VideoPlayerProps) {
  const {
    reactionVideoRef,
    externalVideoRef,
    isPlaying,
    countdown,
    session,
    handlePlay,
    handlePause,
    handleTimeUpdate,
    setVolume,
    setPlaybackRate,
    skipTime,
    startCountdownSync,
    setTimestampSync,
  } = useVideoSync(sessionId);

  const [showControls, setShowControls] = useState(false);
  const [playbackRate, setPlaybackRateState] = useState(1);
  const [reactionVolume, setReactionVolume] = useState(0.8);
  const [externalVolume, setExternalVolume] = useState(0.8);
  
  // Handler for playback rate changes
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRateState(rate);
    setPlaybackRate(rate);
  };

  // Handler for volume changes
  const handleVolumeChange = (isReaction: boolean, value: number) => {
    if (isReaction) {
      setReactionVolume(value);
      setVolume(true, value);
    } else {
      setExternalVolume(value);
      setVolume(false, value);
    }
  };

  // Layout classes
  const containerClasses = cn(
    "relative w-full h-full flex",
    {
      "flex-row": layout === ViewLayout.SIDE_BY_SIDE,
      "flex-col": layout === ViewLayout.STACKED,
      "grid grid-cols-2 gap-4": layout === ViewLayout.GRID,
    },
    className
  );

  const videoClasses = cn("relative w-full h-full group", {
    "flex-1":
      layout === ViewLayout.SIDE_BY_SIDE || layout === ViewLayout.STACKED,
  });

  // Countdown overlay
  const CountdownOverlay = () => {
    if (!countdown) return null;
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/75 z-50">
        <div className="text-7xl font-bold text-white bg-blue-600/20 p-10 rounded-full w-40 h-40 flex items-center justify-center backdrop-blur-md border-4 border-blue-500/50">
          {countdown}
        </div>
      </div>
    );
  };

  // Video Label
  const VideoLabel = ({ title, isReaction }: { title: string; isReaction: boolean }) => (
    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent text-white z-10">
      <div className="flex items-center">
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${isReaction ? "bg-blue-600" : "bg-purple-600"} mr-2`}>
          {isReaction ? "REACTION" : "SOURCE"}
        </span>
        <span className="text-sm font-medium truncate">{title}</span>
      </div>
    </div>
  );

  // Controls overlay
  const ControlsOverlay = ({ isReaction }: { isReaction: boolean }) => (
    <div 
      className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => (isPlaying ? handlePause() : handlePlay())}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <button
              onClick={() => skipTime(-10)}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              aria-label="Rewind 10 seconds"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={() => skipTime(10)}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors backdrop-blur-sm"
              aria-label="Forward 10 seconds"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="ml-2 flex items-center space-x-1">
              <span className="text-xs text-white/80">Volume:</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isReaction ? reactionVolume : externalVolume}
                onChange={(e) => handleVolumeChange(isReaction, parseFloat(e.target.value))}
                className="w-24 accent-blue-500"
              />
            </div>
          </div>
          <button
            onClick={() => startCountdownSync()}
            className="px-3 py-1 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            aria-label="Sync videos"
          >
            Sync Now
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-white/80">Speed:</span>
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-0.5 text-xs rounded ${
                  playbackRate === rate
                    ? "bg-blue-600 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                } transition-colors`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={containerClasses}>
      <div className={videoClasses}>
        <VideoLabel title={reactionVideo.title || "Reaction Video"} isReaction={true} />
        <ReactPlayer
          ref={reactionVideoRef}
          url={reactionVideo.url}
          width="100%"
          height="100%"
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={({ playedSeconds }) => handleTimeUpdate(true)}
          playbackRate={playbackRate}
          volume={reactionVolume}
          config={{
            youtube: {
              playerVars: { 
                modestbranding: 1,
                rel: 0
              }
            }
          }}
          style={{ backgroundColor: "#000" }}
        />
        <CountdownOverlay />
        <ControlsOverlay isReaction={true} />
      </div>
      <div className={videoClasses}>
        <VideoLabel title={externalVideo.title || "Source Video"} isReaction={false} />
        <ReactPlayer
          ref={externalVideoRef}
          url={externalVideo.url}
          width="100%"
          height="100%"
          playing={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onProgress={({ playedSeconds }) => handleTimeUpdate(false)}
          playbackRate={playbackRate}
          volume={externalVolume}
          config={{
            youtube: {
              playerVars: { 
                modestbranding: 1,
                rel: 0
              }
            }
          }}
          style={{ backgroundColor: "#000" }}
        />
        <CountdownOverlay />
        <ControlsOverlay isReaction={false} />
      </div>
    </div>
  );
}
