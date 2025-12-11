import React, { useMemo } from 'react';
import { AppState } from '../types';

interface BackgroundProps {
  appState: AppState;
}

const Background: React.FC<BackgroundProps> = ({ appState }) => {
  const isBeerTime = appState === AppState.BEER_TIME;
  const isGoHome = appState === AppState.GO_HOME;

  // Generate random bubbles/stars configuration only once
  const bubbles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 15 + 2}px`, // Varied sizes
      duration: `${Math.random() * 10 + 5}s`,
      delay: `${Math.random() * 10}s`,
      wobble: `${Math.random() * 50 - 25}px`,
      opacity: Math.random() * 0.5 + 0.1,
    }));
  }, []);

  const getGradientClass = () => {
    if (isGoHome) return 'grad-home';
    if (isBeerTime) return 'grad-beer';
    return 'grad-default';
  };

  return (
    <div className="bg-fixed">
      
      {/* Base Gradient Layer */}
      <div className={`bg-layer ${getGradientClass()} opacity-100`} />

      {/* Secondary Overlay for Depth */}
      <div className="bg-layer radial-overlay" />

      {/* Beer Time Specific Overlay (Gold Glow) */}
      <div className={`bg-layer glow-overlay-gold ${isBeerTime ? 'opacity-100' : 'opacity-0'}`} />

      {/* Go Home Specific Overlay (Twilight/Night Glow) */}
      <div className={`bg-layer glow-overlay-purple ${isGoHome ? 'opacity-100' : 'opacity-0'}`} />

      {/* Particles/Bubbles */}
      {bubbles.map((bubble) => {
        // Dynamic inline styles for bubbles
        const bubbleStyle: React.CSSProperties = {
          left: bubble.left,
          width: isGoHome ? Math.max(2, parseFloat(bubble.size) / 3) + 'px' : bubble.size,
          height: isGoHome ? Math.max(2, parseFloat(bubble.size) / 3) + 'px' : bubble.size,
          animationDuration: isBeerTime ? `3s` : bubble.duration, 
          animationDelay: isBeerTime ? `${Math.random() * 2}s` : bubble.delay,
          '--wobble': isGoHome ? '0px' : bubble.wobble,
          backgroundColor: isBeerTime ? 'rgba(254, 240, 138, 0.4)' : // Yellow-200ish
                           isGoHome ? 'white' : 'rgba(255, 255, 255, 0.05)',
          boxShadow: isBeerTime ? '0 0 4px rgba(255,255,255,0.8)' : 
                     isGoHome ? '0 0 6px rgba(255,255,255,0.9)' : 'none'
        };

        return (
          <div
            key={bubble.id}
            className="bubble"
            style={bubbleStyle}
          />
        );
      })}
      
      {/* Foam Head Effect (Only visible during Beer Time) */}
      <div className={`foam-effect ${isBeerTime ? 'active' : ''}`} />
    </div>
  );
};

export default Background;