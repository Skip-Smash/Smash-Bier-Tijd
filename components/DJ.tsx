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
      <div className="dj-controls">
        
        {/* Fullscreen Button - Only show if NOT embedded in an iframe */}
        {!isEmbedded && (
          <button
            onClick={handleToggleFullscreen}
            className="btn-icon"
            title={isFullscreen ? "Scherm verkleinen" : "Volledig scherm"}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        )}

        {/* Sound Button */}
        <button
          onClick={handleToggleMute}
          className="btn-icon group"
          title={isMuted ? "Geluid aanzetten" : "Geluid uitzetten"}
        >
          {isMuted ? (
            <VolumeX size={24} className="icon-muted" />
          ) : (
            <div className="indicator-wrapper">
              <Volume2 size={24} className={shouldPlay ? "icon-active" : ""} />
              {shouldPlay && (
                <span className="indicator-dot"></span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* Hidden YouTube Player */}
      {isBeerTime && (
        <div style={{ display: 'none' }}>
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