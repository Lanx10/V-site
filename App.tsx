
import React, { useState } from 'react';
import { Screen, Preferences, QuoteData } from './types';
import Landing from './components/Landing';
import PreferencesScreen from './components/PreferencesScreen';
import Result from './components/Result';
// Fix: Use the Gemini-powered service instead of the static library
import { generatePersonalizedQuote as getPersonalizedQuote } from './geminiService';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LANDING);
  const [preferences, setPreferences] = useState<Preferences>({
    color: '#ff4d6d',
    bloom: 'Rose',
    companion: 'Dog',
    treat: 'Chocolate',
    fontStyle: 'elegant',
    cardStyle: 'gradient',
    borderStyle: 'none'
  });
  const [quote, setQuote] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = () => {
    setCurrentScreen(Screen.PREFERENCES);
  };

  const handlePreferencesComplete = async (newPrefs: Preferences) => {
    setPreferences(newPrefs);
    setIsLoading(true);
    setCurrentScreen(Screen.RESULT);
    
    try {
      const generatedQuote = await getPersonalizedQuote(newPrefs);
      setQuote(generatedQuote);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = (update: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...update }));
  };

  const handleBack = () => {
    if (currentScreen === Screen.RESULT) setCurrentScreen(Screen.PREFERENCES);
    else if (currentScreen === Screen.PREFERENCES) setCurrentScreen(Screen.LANDING);
    setQuote(null);
  };

  const handleNewQuote = () => {
    setQuote(null);
    setCurrentScreen(Screen.PREFERENCES);
  };

  return (
    <div className="min-h-screen bg-cream-soft font-display text-[#181113] overflow-x-hidden flex justify-center">
      <div className="w-full max-w-[480px] bg-background-light shadow-2xl relative flex flex-col min-h-screen">
        {currentScreen === Screen.LANDING && (
          <Landing onStart={handleStart} />
        )}
        
        {currentScreen === Screen.PREFERENCES && (
          <PreferencesScreen 
            onBack={handleBack} 
            onGenerate={handlePreferencesComplete} 
          />
        )}

        {currentScreen === Screen.RESULT && (
          <Result 
            quote={quote} 
            isLoading={isLoading} 
            onBack={handleBack} 
            onNewQuote={handleNewQuote}
            prefs={preferences}
            onUpdatePrefs={updatePreference}
          />
        )}
      </div>
    </div>
  );
};

export default App;
