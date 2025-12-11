import React, { useEffect, useState } from 'react';
import { formatTime } from '../utils/randomTime';
import { AppState } from '../types';

interface ClockProps {
  appState: AppState;
}

const Clock: React.FC<ClockProps> = ({ appState }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTextColor = () => {
    if (appState === AppState.BEER_TIME) return 'text-yellow-400';
    if (appState === AppState.GO_HOME) return 'text-purple-300';
    return 'text-gray-200';
  };

  return (
    <div className={`text-center transition-colors duration-500 ${getTextColor()}`}>
      <div className="font-display text-7xl md:text-9xl tracking-wider drop-shadow-lg tabular-nums">
        {formatTime(currentTime)}
      </div>
      <div className="text-sm md:text-xl text-gray-500 mt-2 tracking-[0.2em] uppercase font-bold">
        {currentTime.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
    </div>
  );
};

export default Clock;