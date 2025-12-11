import React from 'react';
import { BeerTimeConfig, AppState } from '../types';
import { formatShortTime } from '../utils/randomTime';
import { Info, Moon } from 'lucide-react';

interface BeerStatusProps {
  config: BeerTimeConfig;
  appState: AppState;
}

const BeerStatus: React.FC<BeerStatusProps> = ({ config, appState }) => {
  if (appState === AppState.BEER_TIME) {
    return (
      <div className="mt-12 p-6 border-4 border-yellow-500 rounded-xl bg-yellow-500/10 animate-pulse-glow">
        <h2 className="text-4xl md:text-6xl font-black uppercase text-yellow-500 tracking-tighter transform -rotate-2">
          HET IS TIJD!
        </h2>
        <p className="text-yellow-200 mt-2 font-bold uppercase tracking-widest">Smash Studios Borrel</p>
      </div>
    );
  }

  if (appState === AppState.GO_HOME) {
    return (
      <div className="mt-12 p-6 border-4 border-purple-500 rounded-xl bg-purple-900/40 backdrop-blur-md">
        <div className="flex justify-center mb-2 text-purple-300">
          <Moon size={40} className="animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black uppercase text-purple-300 tracking-tighter text-center">
          INPAKKEN & WEGWEZEN
        </h2>
        <p className="text-purple-200 mt-2 font-bold uppercase tracking-widest text-center">Iedereen mag naar huis</p>
      </div>
    );
  }

  return (
    <div className="mt-12 flex flex-col items-center">
      <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 shadow-2xl">
        <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold mb-2 text-center">
          Vandaag bier tijd om
        </p>
        <div className="text-5xl font-display text-white text-center">
          {formatShortTime(config.hour, config.minute)}
        </div>
      </div>
      
      <div className="mt-6 flex items-center gap-2 text-gray-600 text-xs max-w-xs text-center">
        <Info size={14} />
        <p>Tijd wordt dagelijks willekeurig bepaald tussen 11:00 en {new Date().getDay() === 5 ? '14:30' : '17:00'}.</p>
      </div>
    </div>
  );
};

export default BeerStatus;