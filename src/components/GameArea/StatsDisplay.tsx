import React from 'react';
import { useGame } from '../../context/GameContext'; 

const StatsDisplay: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="text-center space-y-3">
      <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/20 inline-block">
        <p className="text-xl text-white mb-1">Tap Power</p>
        <p className="text-3xl font-bold text-yellow-400">+{gameState.pointsPerTap}</p>
      </div>
      
      {gameState.autoPointsPerSecond > 0 && (
        <div className="bg-green-500/20 rounded-2xl p-3 backdrop-blur-md border border-green-500/30 inline-block">
          <p className="text-sm text-green-300">Auto Mining</p>
          <p className="text-lg font-bold text-green-400">+{gameState.autoPointsPerSecond}/sec</p>
        </div>
      )}
    </div>
  );
};

export default StatsDisplay;