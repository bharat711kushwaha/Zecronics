import React from 'react';
import TapButton from './TapButton';
import StatsDisplay from './StatsDisplay';

const GameArea: React.FC = () => {
  return (
    <>
      <div className="min-h-full p-6 relative text-white gamearea-bg">
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
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl mx-auto space-y-6 py-8">
          {/* Coin tap button */}
          <div className="flex-shrink-0">
            <TapButton />
          </div>

          {/* Stats panel styled */}
          <div className="w-full max-w-md flex-shrink-0">
            <StatsDisplay />
          </div>

          {/* Additional content space - you can add more elements here */}
          <div className="w-full flex-1 flex flex-col items-center space-y-4">
            {/* Add more game elements here if needed */}
            {/* They will automatically be scrollable */}
          </div>
        </div>
      </div>

      {/* Global CSS Styles */}
      <style>{`
        .gamearea-bg {
          background-image: 
            linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 0.9), rgba(55, 65, 81, 0.8)),
            url('/bg.jpg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
        }
      `}</style>
    </>
  );
};

export default GameArea;