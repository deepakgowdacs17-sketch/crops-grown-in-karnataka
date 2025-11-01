import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onLanguageChange }) => {
  const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200';
  const activeClasses = 'bg-white text-red-600 shadow';
  const inactiveClasses = 'bg-transparent text-white hover:bg-white/20';

  return (
    <div className="flex items-center space-x-2 bg-white/20 rounded-lg p-1">
      <button
        onClick={() => onLanguageChange('english')}
        className={`${baseClasses} ${language === 'english' ? activeClasses : inactiveClasses}`}
      >
        English
      </button>
      <button
        onClick={() => onLanguageChange('kannada')}
        className={`${baseClasses} ${language === 'kannada' ? activeClasses : inactiveClasses}`}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
};

export default LanguageSelector;