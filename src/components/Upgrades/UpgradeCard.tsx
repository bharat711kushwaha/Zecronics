import React from 'react';
import { useGame } from '../../context/GameContext'; 
import type { Upgrade } from '../../types/game';
import { formatNumber } from '../../utils/formatters'; 

interface UpgradeCardProps {
  upgrade: Upgrade;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ upgrade }) => {
  const { gameState, handleUpgrade } = useGame();
  
  const canAfford = gameState.points >= upgrade.cost;
  const nextLevelBonus = upgrade.type === 'tap' ? upgrade.level + 1 : 
                        upgrade.type === 'auto' ? (upgrade.level + 1) * 2 : 100;

  return (
    <div className="group">
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">{upgrade.icon}</span>
            </div>
            {upgrade.level > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{upgrade.level}</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">{upgrade.name}</h3>
            <p className="text-sm text-gray-300 mb-2">{upgrade.description}</p>
            <div className="flex items-center justify-between">
              <div className="text-xs space-y-1">
                <p className="text-blue-300">Level {upgrade.level}</p>
                {upgrade.type === 'tap' && (
                  <p className="text-green-400">Next: +{nextLevelBonus} per tap</p>
                )}
                {upgrade.type === 'auto' && upgrade.level > 0 && (
                  <p className="text-yellow-400">Current: +{upgrade.level * 2}/sec</p>
                )}
              </div>
              
              <button
                onClick={() => handleUpgrade(upgrade.id)}
                disabled={!canAfford}
                className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 ${
                  canAfford
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-gray-600 cursor-not-allowed opacity-50'
                }`}
              >
                💎 {formatNumber(upgrade.cost)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeCard;