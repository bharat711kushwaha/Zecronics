import React from 'react';
import { useGame } from '../../context/GameContext'; 
import TapEffect from './TapEffect';

const TapButton: React.FC = () => {
  const { gameState, handleTap } = useGame();

  return (
    <div className="relative mb-8">
      <div 
        onClick={handleTap}
        className="w-80 h-80 relative cursor-pointer flex items-center justify-center"
        style={{ userSelect: 'none' }}
      >
        {/* Sirf Image, aur kuch nahi */}
        <img 
          src="/logo.png" 
          alt="Coin" 
          className="w-80 h-80 rounded-full object-cover cursor-pointer" 
        />
      </div>

      {/* Tap Effects agar rakhnge toh yaha render honge */}
      {gameState.tapEffects.map(effect => (
        <TapEffect key={effect.id} effect={effect} />
      ))}
    </div>
  );
};

export default TapButton;
