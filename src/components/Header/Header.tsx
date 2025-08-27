import React from 'react';
import { useGame } from '../../context/GameContext'; 
import { formatNumber, calculateLevelProgress } from '../../utils/formatters';
import EnergyBar from './EnergyBar';

const Header: React.FC = () => {
  const { gameState } = useGame();
  const levelProgress = calculateLevelProgress(gameState.points);

  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-6 shadow-2xl">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/20">
                <span className="text-2xl font-bold text-white">Z</span>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{gameState.level}</span>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Zecronics</h1>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-200">Level {gameState.level}</span>
                <div className="w-20 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                    style={{ width: `${levelProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-3xl">💎</span>
              <span className="text-3xl font-bold text-white">{formatNumber(gameState.points)}</span>
            </div>
            <p className="text-sm text-blue-200">Zec Points</p>
          </div>
        </div>

        <EnergyBar energy={gameState.energy} maxEnergy={gameState.maxEnergy} />
      </div>
    </div>
  );
};

export default Header;