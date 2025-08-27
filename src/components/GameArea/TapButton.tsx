import React from 'react';
import { useGame } from '../../context/GameContext'; 
import TapEffect from './TapEffect';

const TapButton: React.FC = () => {
  const { gameState, handleTap } = useGame();

  return (
    <div className="relative mb-8">
      <div 
        onClick={handleTap}
        className="w-80 h-80 relative cursor-pointer group transform transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ userSelect: 'none' }}
      >
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
        
        {/* Main Button */}
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30 overflow-hidden">
          {/* Inner Shine Effect */}
          <div className="absolute inset-4 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
          
          {/* Center Icon */}
          <div className="relative z-10 text-8xl filter drop-shadow-lg">⚡</div>
          
          {/* Ripple Effect on Tap */}
          <div className="absolute inset-0 rounded-full group-active:animate-ping bg-white/20"></div>
        </div>
      </div>

      {/* Tap Effects */}
      {gameState.tapEffects.map(effect => (
        <TapEffect key={effect.id} effect={effect} />
      ))}
    </div>
  );
};

export default TapButton;