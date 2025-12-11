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
    return <div className="animate-pulse text-yellow-500/50 mt-8">Laden van wijsheid...</div>;
  }

  const isBeerTime = appState === AppState.BEER_TIME;
  const isGoHome = appState === AppState.GO_HOME;

  return (
    <div className="mt-8 max-w-2xl mx-auto px-4">
      <div className={`transform transition-all duration-700 ${isBeerTime ? 'scale-110' : 'scale-100'}`}>
        {isBeerTime && (
            <div className="flex justify-center mb-4 text-yellow-400 animate-float">
                <Beer size={48} />
            </div>
        )}
        <p className={`text-2xl md:text-4xl font-bold text-center leading-tight ${
          isBeerTime ? 'text-yellow-400' : 
          isGoHome ? 'text-purple-300' :
          'text-gray-400'
        }`}>
          "{quote}"
        </p>
      </div>
    </div>
  );
};

export default QuoteDisplay;