import React from 'react';
import { useGame } from '../../context/GameContext';
import { formatNumber } from '../../utils/formatters';

const StatsTab: React.FC = () => {
  const { gameState } = useGame();

  const stats = [
    { label: 'Total Points', value: formatNumber(gameState.points), icon: '💎' },
    { label: 'Current Level', value: gameState.level.toString(), icon: '🏆' },
    { label: 'Points per Tap', value: gameState.pointsPerTap.toString(), icon: '👆' },
    { label: 'Auto Mining', value: `${gameState.autoPointsPerSecond}/sec`, icon: '🤖' },
    { label: 'Max Energy', value: gameState.maxEnergy.toString(), icon: '⚡' },
  ];

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8 text-center bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
        Game Statistics
      </h2>
      
      <div className="max-w-md mx-auto space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-white font-semibold">{stat.label}</span>
              </div>
              <span className="text-xl font-bold text-yellow-400">{stat.value}</span>
            </div>
          </div>
        ))}
        
        <div className="mt-8 bg-gradient-to-r from-purple-800/50 to-pink-800/50 rounded-2xl p-5 backdrop-blur-md border border-purple-500/20">
          <h3 className="text-lg font-bold text-white mb-3">Upgrade Levels</h3>
          {gameState.upgrades.map(upgrade => (
            <div key={upgrade.id} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{upgrade.icon}</span>
                <span className="text-white text-sm">{upgrade.name}</span>
              </div>
              <span className="text-blue-400 font-bold">Lv.{upgrade.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsTab;