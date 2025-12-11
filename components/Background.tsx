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

  const getGradient = () => {
    if (isGoHome) return 'bg-gradient-to-b from-indigo-900 via-purple-900 to-black';
    if (isBeerTime) return 'bg-gradient-to-b from-yellow-500 via-amber-600 to-amber-900';
    return 'bg-gradient-to-b from-neutral-900 via-neutral-950 to-black';
  };

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-all duration-1000 ease-in-out">
      
      {/* Base Gradient Layer */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${getGradient()} opacity-100`}
      />

      {/* Secondary Overlay for Depth */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-60`} 
      />

      {/* Beer Time Specific Overlay (Gold Glow) */}
      <div 
        className={`absolute inset-0 bg-yellow-400/20 mix-blend-overlay transition-opacity duration-1000 ${
          isBeerTime ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Go Home Specific Overlay (Twilight/Night Glow) */}
      <div 
        className={`absolute inset-0 bg-purple-500/20 mix-blend-overlay transition-opacity duration-1000 ${
          isGoHome ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Particles/Bubbles */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`bubble transition-all duration-1000 ${
            isBeerTime ? 'bg-yellow-200/40 shadow-[0_0_4px_rgba(255,255,255,0.8)] rounded-full' : 
            isGoHome ? 'bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] rounded-full' : // Stars for Go Home
            'bg-white/5 rounded-full'
          }`}
          style={{
            left: bubble.left,
            width: isGoHome ? Math.max(2, parseFloat(bubble.size) / 3) + 'px' : bubble.size, // Smaller stars
            height: isGoHome ? Math.max(2, parseFloat(bubble.size) / 3) + 'px' : bubble.size,
            animationDuration: isBeerTime ? `3s` : bubble.duration, 
            animationDelay: isBeerTime ? `${Math.random() * 2}s` : bubble.delay,
            '--wobble': isGoHome ? '0px' : bubble.wobble, // Stars don't wobble as much
          } as React.CSSProperties}
        />
      ))}
      
      {/* Foam Head Effect (Only visible during Beer Time) */}
      <div 
        className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/90 to-transparent transition-transform duration-1000 origin-top ${
          isBeerTime ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`} 
      />
    </div>
  );
};

export default Background;