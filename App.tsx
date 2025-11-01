import React, { useState } from 'react';
import { Language } from './types';
import InfoPage from './components/InfoPage';
import Chatbot from './components/Chatbot';
import LandingPage from './components/LandingPage';

function App() {
  const [language, setLanguage] = useState<Language>('kannada');
  const [isExploring, setIsExploring] = useState(false);

  const handleExplore = () => {
    setIsExploring(true);
  };

  const handleBack = () => {
    setIsExploring(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 font-sans">
      {isExploring ? (
        <main>
          <InfoPage language={language} onBack={handleBack} />
          <Chatbot language={language} setLanguage={setLanguage} />
        </main>
      ) : (
        <LandingPage
          language={language}
          onLanguageChange={setLanguage}
          onExplore={handleExplore}
        />
      )}
    </div>
  );
}

export default App;