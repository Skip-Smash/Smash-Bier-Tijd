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
      <div className="status-card beer-time">
        <h2 className="title-large text-beer title-rotate">
          HET IS TIJD!
        </h2>
        <p className="subtitle-beer">Smash Studios Borrel</p>
      </div>
    );
  }

  if (appState === AppState.GO_HOME) {
    return (
      <div className="status-card go-home">
        <div className="icon-container">
          <Moon size={40} className="icon-active" />
        </div>
        <h2 className="title-large text-home">
          INPAKKEN & WEGWEZEN
        </h2>
        <p className="subtitle-home">Iedereen mag naar huis</p>
      </div>
    );
  }

  return (
    <div className="status-card waiting">
      <div className="waiting-content">
        <p className="waiting-label">
          Vandaag bier tijd om
        </p>
        <div className="waiting-time">
          {formatShortTime(config.hour, config.minute)}
        </div>
      </div>
      
      <div className="info-row">
        <Info size={14} />
        <p>Tijd wordt dagelijks willekeurig bepaald tussen 11:00 en {new Date().getDay() === 5 ? '14:30' : '17:00'}.</p>
      </div>
    </div>
  );
};

export default BeerStatus;