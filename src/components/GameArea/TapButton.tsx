import React from 'react';
import { useGame } from '../../context/GameContext'; 
import TapEffect from './TapEffect';

const TapButton: React.FC = () => {
  const { gameState, handleTap } = useGame();

  return (
    <div className="relative mb-8">
      <div 
        onClick={handleTap}
        className="w-80 h-80 relative cursor-pointer flex items-center justify-center active:scale-95 transition-transform"
        style={{ userSelect: 'none' }}
      >
        {/* Ripple on Tap */}
        <div className="absolute inset-0 rounded-full group-active:animate-ping bg-yellow-400/10"></div>

        {/* Coin Image */}
        <img 
          src="/zynk.jpg" 
          alt="Coin" 
          className="w-60 h-60 rounded-full object-cover cursor-pointer shadow-[0_0_40px_rgba(255,215,0,0.5)] active:scale-95 transition-transform" 
        />

        {/* Flash Effect */}
        <div className="absolute inset-0 rounded-full bg-yellow-300/10 opacity-0 active:opacity-100 transition duration-300"></div>
      </div>

      {/* Floating +1 Effects */}
      {gameState.tapEffects.map(effect => (
        <TapEffect key={effect.id} effect={effect} />
      ))}
    </div>
  );
};

export default TapButton;
