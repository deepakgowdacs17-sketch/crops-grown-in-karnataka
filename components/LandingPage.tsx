import React from 'react';
import { Language } from '../types';
import { uiContent } from '../constants';
import LanguageSelector from './LanguageSelector';

interface LandingPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onExplore: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ language, onLanguageChange, onExplore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white text-center p-4">
      <div className="bg-black/20 backdrop-blur-md p-8 md:p-12 rounded-2xl shadow-xl max-w-3xl mx-auto">
          <h1 className="font-serif text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {uiContent.landingTitle[language]}
          </h1>
          <p className="text-lg md:text-xl mb-8 mx-auto drop-shadow-md">
            {uiContent.landingSubtitle[language]}
          </p>
          <div className="flex justify-center mb-8">
            <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
          </div>
          <button
            onClick={onExplore}
            className="bg-red-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50"
            aria-label="Explore crops information"
          >
            {uiContent.exploreButton[language]}
          </button>
      </div>
    </div>
  );
};

export default LandingPage;