
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import { isInIframe } from '../utils/environment';

interface DJProps {
  isBeerTime: boolean;
}

const DJ: React.FC<DJProps> = ({ isBeerTime }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEmbedded, setIsEmbedded] = useState(false);

  // YouTube Video ID for the song. 
  // "KqJvQeY-s80" is René Karst - Atje Voor De Sfeer.
  const VIDEO_ID = "KqJvQeY-s80"; 
  const START_TIME = 48; 

  // Check if we are in an iframe
  useEffect(() => {
    setIsEmbedded(isInIframe());
  }, []);

  // Listen to fullscreen changes (in case user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const shouldPlay = isBeerTime && !isMuted;

  return (
    <>
      {/* Controls Container */}
      <div className="fixed top-4 right-4 z-50 flex gap-3">
        
        {/* Fullscreen Button - Only show if NOT embedded in an iframe */}
        {!isEmbedded && (
          <button
            onClick={handleToggleFullscreen}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95"
            title={isFullscreen ? "Scherm verkleinen" : "Volledig scherm"}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        )}

        {/* Sound Button */}
        <button
          onClick={handleToggleMute}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-white transition-all hover:scale-105 active:scale-95 group"
          title={isMuted ? "Geluid aanzetten" : "Geluid uitzetten"}
        >
          {isMuted ? (
            <VolumeX size={24} className="text-gray-400 group-hover:text-white" />
          ) : (
            <div className="relative">
              <Volume2 size={24} className={shouldPlay ? "animate-pulse text-yellow-400" : ""} />
              {shouldPlay && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Hidden YouTube Player */}
      {isBeerTime && (
        <div className="hidden">
           {!isMuted && (
             <iframe
               width="560"
               height="315"
               src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&start=${START_TIME}&controls=0&loop=1&playlist=${VIDEO_ID}`}
               title="Beer Time Song"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
             ></iframe>
           )}
        </div>
      )}
    </>
  );
};

export default DJ;