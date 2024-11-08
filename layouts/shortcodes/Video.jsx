"use client";

import { useState, useRef } from 'react';
import { 
  IoPlayCircle, 
  IoPauseCircle, 
  IoVolumeHigh, 
  IoVolumeMute,
  IoExpand 
} from 'react-icons/io5';

const VideoPlayer = ({ 
  src, 
  poster, 
  title = "Video", 
  width = "100%", 
  height = "auto" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progressPercent = 
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(progressPercent);
  };

  const handleSeek = (e) => {
    const seekTime = 
      (e.nativeEvent.offsetX / e.target.offsetWidth) * videoRef.current.duration;
    videoRef.current.currentTime = seekTime;
  };

  const toggleFullScreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.mozRequestFullScreen) { // Firefox
      videoRef.current.mozRequestFullScreen();
    } else if (videoRef.current.webkitRequestFullscreen) { // Chrome, Safari and Opera
      videoRef.current.webkitRequestFullscreen();
    } else if (videoRef.current.msRequestFullscreen) { // IE/Edge
      videoRef.current.msRequestFullscreen();
    }
  };

  return (
    <div 
      className="video-player bg-black rounded-lg overflow-hidden max-w-2xl mx-auto shadow-lg"
      style={{ width, height }}
    >
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          className="w-full h-auto"
        />
        
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
            onClick={togglePlay}
          >
            <IoPlayCircle className="text-5xl text-white" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 flex items-center space-x-4">
          <button 
            onClick={togglePlay} 
            className="text-2xl text-white hover:opacity-80"
          >
            {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
          </button>
          
          <div className="flex-grow">
            <div 
              className="h-1 bg-gray-500 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-1 bg-primary rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleMute} 
              className="text-xl text-white hover:text-primary"
            >
              {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
            </button>
            
            <button 
              onClick={toggleFullScreen} 
              className="text-xl text-white hover:text-primary"
            >
              <IoExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
