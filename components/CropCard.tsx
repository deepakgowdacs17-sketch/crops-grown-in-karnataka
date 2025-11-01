import React from 'react';

interface CropCardProps {
  imageUrl: string;
  name: string;
  description: string;
  onClick: () => void;
}

const CropCard: React.FC<CropCardProps> = ({ imageUrl, name, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl duration-300 text-left w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-500 focus:ring-white"
      aria-label={`View details for ${name}`}
    >
      <img className="w-full h-48 object-cover" src={imageUrl} alt={name} />
      <div className="p-6">
        <h3 className="font-serif font-bold text-xl mb-2 text-gray-800">{name}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </button>
  );
};

export default CropCard;