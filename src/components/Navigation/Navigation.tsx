import React from 'react';
import { useGame } from '../../context/GameContext'; 

const Navigation: React.FC = () => {
  const { gameState, setActiveTab } = useGame();

  const tabs = [
    { id: 'home', label: 'Mine', icon: '⚡' },
    { id: 'upgrades', label: 'Upgrade', icon: '🚀' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 safe-area-pb">
      <div className="flex justify-around p-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center space-y-2 p-3 rounded-2xl transition-all duration-300 ${
              gameState.activeTab === tab.id 
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg' 
                : 'hover:bg-white/5'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className={`text-xs font-semibold ${
              gameState.activeTab === tab.id ? 'text-blue-300' : 'text-gray-400'
            }`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;