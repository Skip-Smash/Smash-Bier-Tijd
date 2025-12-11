import React, { useEffect, useState } from 'react';
import { fetchBeerQuote } from '../services/gemini';
import { Beer } from 'lucide-react';
import { AppState } from '../types';

interface QuoteDisplayProps {
  appState: AppState;
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({ appState }) => {
  const [quote, setQuote] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadQuote = async () => {
      setLoading(true);
      const text = await fetchBeerQuote();
      setQuote(text);
      setLoading(false);
    };

    if (appState === AppState.BEER_TIME) {
      loadQuote();
    } else if (appState === AppState.GO_HOME) {
      setQuote("Tot morgen toppers! Geniet van je avond.");
    } else {
      setQuote("Nog even volhouden strijders...");
    }
  }, [appState]);

  if (loading) {
    return <div className="loading-text">Laden van wijsheid...</div>;
  }

  const isBeerTime = appState === AppState.BEER_TIME;
  const isGoHome = appState === AppState.GO_HOME;

  const getTextColorClass = () => {
    if (isBeerTime) return 'text-beer';
    if (isGoHome) return 'text-home';
    return 'text-default'; // gray
  };

  return (
    <div className="quote-container">
      <div className={`quote-wrapper ${isBeerTime ? 'active' : ''}`}>
        {isBeerTime && (
            <div className="icon-float">
                <Beer size={48} />
            </div>
        )}
        <p className={`quote-text ${getTextColorClass()}`}>
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default QuoteDisplay;