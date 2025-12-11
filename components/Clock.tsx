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

  const getTextColorClass = () => {
    if (appState === AppState.BEER_TIME) return 'text-beer';
    if (appState === AppState.GO_HOME) return 'text-home';
    return 'text-default';
  };

  return (
    <div className={`clock-container ${getTextColorClass()}`}>
      <div className="clock-time">
        {formatTime(currentTime)}
      </div>
      <div className="clock-date">
        {currentTime.toLocaleDateString('nl-NL', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
    </div>
  );
};

export default Clock;