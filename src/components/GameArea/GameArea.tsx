import React from 'react';
import TapButton from './TapButton';
import StatsDisplay from './StatsDisplay';

const GameArea: React.FC = () => {
  return (
    <div className="min-h-full p-6 relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      {/* Background Effects - Kombat Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Fiery red aura left */}
        <div className="absolute top-24 left-16 w-36 h-36 bg-red-600/20 rounded-full blur-2xl animate-pulse"></div>
        {/* Purple aura right */}
        <div className="absolute bottom-24 right-16 w-32 h-32 bg-purple-600/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
        {/* Golden energy behind center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-ping"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-6">
        {/* Coin tap button */}
        <div className="flex-shrink-0">
          <TapButton />
        </div>

        {/* Stats panel styled */}
        <div className="w-full max-w-md flex-shrink-0">
          <StatsDisplay />
        </div>
      </div>
    </div>
  );
};

export default GameArea;