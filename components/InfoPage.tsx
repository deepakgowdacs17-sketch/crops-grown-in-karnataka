import React, { useState } from 'react';
import { Language, Crop } from '../types';
import { cropsData, uiContent } from '../constants';
import CropCard from './CropCard';
import CropModal from './CropModal';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface InfoPageProps {
  language: Language;
  onBack: () => void;
}

const InfoPage: React.FC<InfoPageProps> = ({ language, onBack }) => {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  const handleCardClick = (crop: Crop) => {
    setSelectedCrop(crop);
  };

  const handleCloseModal = () => {
    setSelectedCrop(null);
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
         <button
            onClick={onBack}
            className="absolute top-6 left-4 sm:left-6 lg:left-8 text-white bg-black/20 rounded-full p-2 hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={uiContent.backButton[language]}
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        <h1 className="font-serif text-4xl md:text-5xl font-extrabold text-center mb-12 text-white drop-shadow-lg pt-16 sm:pt-0">
          {uiContent.title[language]}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cropsData.map((crop) => (
            <CropCard
              key={crop.id}
              imageUrl={crop.image}
              name={crop.name[language]}
              description={crop.description[language]}
              onClick={() => handleCardClick(crop)}
            />
          ))}
        </div>
      </div>
      {selectedCrop && (
        <CropModal
          crop={selectedCrop}
          language={language}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default InfoPage;