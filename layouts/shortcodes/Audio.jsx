"use client";

import { useState, useRef } from 'react';
import { 
  IoPlayCircle, 
  IoPauseCircle, 
  IoVolumeHigh, 
  IoVolumeMute 
} from 'react-icons/io5';

const AudioPlayer = ({ src, title = "Audio Track", cover }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const progressPercent = 
      (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(progressPercent);
  };

  const handleSeek = (e) => {
    const seekTime = 
      (e.nativeEvent.offsetX / e.target.offsetWidth) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
  };

  return (
    <div className="audio-player bg-gray-100 rounded-lg p-4 flex items-center space-x-4 max-w-md mx-auto shadow-md">
      {cover && (
        <div className="w-16 h-16 shrink-0">
          <img 
            src={cover} 
            alt={title} 
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      )}
      <div className="flex-grow">
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlay} 
            className="text-3xl text-primary hover:opacity-80 transition"
          >
            {isPlaying ? <IoPauseCircle /> : <IoPlayCircle />}
          </button>
          
          <div className="flex-grow">
            <div 
              className="h-1 bg-gray-300 rounded-full cursor-pointer"
              onClick={handleSeek}
            >
              <div 
                className="h-1 bg-primary rounded-full" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-1">{title}</p>
          </div>
          
          <button 
            onClick={toggleMute} 
            className="text-xl text-gray-600 hover:text-primary"
          >
            {isMuted ? <IoVolumeMute /> : <IoVolumeHigh />}
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        src={src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
