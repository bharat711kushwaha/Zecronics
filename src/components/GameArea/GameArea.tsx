import React from 'react';

import TapButton from './TapButton';
import StatsDisplay from './StatsDisplay';

const GameArea: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-300px)] p-6 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        <TapButton />
        <StatsDisplay />
      </div>
    </div>
  );
};

export default GameArea;