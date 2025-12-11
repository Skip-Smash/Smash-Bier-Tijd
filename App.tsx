
import React, { useEffect, useState } from 'react';
import Clock from './components/Clock';
import QuoteDisplay from './components/QuoteDisplay';
import BeerStatus from './components/BeerStatus';
import Background from './components/Background';
import DJ from './components/DJ';
import { getDailyBeerTime } from './utils/randomTime';
import { AppState, BeerTimeConfig } from './types';
import { isInIframe } from './utils/environment';

const App: React.FC = () => {
  const [config, setConfig] = useState<BeerTimeConfig | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.LOADING);
  const [isEmbedded, setIsEmbedded] = useState(false);

  // Initialize the daily time
  useEffect(() => {
    const dailyConfig = getDailyBeerTime();
    setConfig(dailyConfig);
    setIsEmbedded(isInIframe());
  }, []);

  // Check time status every second
  useEffect(() => {
    if (!config) return;

    const checkTime = () => {
      const now = new Date();
      const currentTime = now.getTime();

      // Priority check: Is the work day over?
      if (currentTime > config.endTimestamp) {
        setAppState(AppState.GO_HOME);
      } 
      // Is it past the random beer time?
      else if (currentTime >= config.timestamp) {
        setAppState(AppState.BEER_TIME);
      } 
      // Otherwise we wait
      else {
        setAppState(AppState.WAITING);
      }
    };

    // Check immediately
    checkTime();

    // Set interval
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, [config]);

  if (!config) return <div className="min-h-screen bg-neutral-900 flex items-center justify-center text-white">Laden...</div>;

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-yellow-500 selection:text-black font-sans">
      
      {/* New Dynamic Background */}
      <Background appState={appState} />

      {/* DJ handles the music - only during actual beer time, not when going home */}
      <DJ isBeerTime={appState === AppState.BEER_TIME} />

      <main className="z-10 relative w-full h-screen flex flex-col">
        
        {/* Flexible container to center content but allow footer at bottom */}
        <div className="flex-grow flex flex-col items-center justify-center px-6">
          
          {/* Header Branding - Only show if NOT embedded */}
          {!isEmbedded && (
            <div className="mb-8 text-white/50 font-bold tracking-[0.5em] text-xs md:text-sm uppercase drop-shadow-md">
              Smash Studios Internal Tool
            </div>
          )}

          {/* Main Clock */}
          <Clock appState={appState} />

          {/* Status Display (Target Time, IT IS TIME, or GO HOME) */}
          <BeerStatus config={config} appState={appState} />

          {/* Dynamic Quote */}
          <QuoteDisplay appState={appState} />

        </div>

        {/* Footer - Hide if embedded to save space */}
        {!isEmbedded && (
          <footer className="py-6 text-white/30 text-xs text-center w-full">
            &copy; {new Date().getFullYear()} Smash Studios. Drink verantwoord.
          </footer>
        )}
      </main>
    </div>
  );
};

export default App;