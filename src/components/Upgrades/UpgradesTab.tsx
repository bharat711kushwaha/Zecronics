import React from 'react';
import { useGame } from '../../context/GameContext'; 
import UpgradeCard from './UpgradeCard';

const UpgradesTab: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Power Upgrades
      </h2>
      
      <div className="space-y-4 max-w-md mx-auto">
        {gameState.upgrades.map(upgrade => (
          <UpgradeCard key={upgrade.id} upgrade={upgrade} />
        ))}
      </div>
    </div>
  );
};

export default UpgradesTab;