import React from 'react';
import { useGame } from '../../context/GameContext'; 
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  const { gameState, setActiveTab } = useGame();

  const tabs = [
    { id: 'home', label: 'Mine', icon: '⚡' },
    { id: 'upgrades', label: 'Upgrade', icon: '🚀' },
    { id: 'investment', label: 'Invest', icon: '💰', isLink: true, to: '/investment' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
<div className="sticky bottom-0 bg-black/90 backdrop-blur-xl border-t border-purple-500/20 safe-area-pb shadow-2xl">

      {/* Animated glow effect */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-pulse"></div>
      
      <div className="flex justify-around p-3 sm:p-4">
        {tabs.map(tab => {
          if (tab.isLink) {
            return (
              <Link
                key={tab.id}
                to={tab.to}
                className="flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 border border-transparent hover:border-yellow-500/30 shadow-lg hover:shadow-yellow-500/20 transform hover:scale-105 animate-glow-gold"
              >
                <span className="text-2xl animate-bounce">{tab.icon}</span>
                <span className="text-xs font-semibold text-yellow-300 hover:text-yellow-200 transition-colors">
                  {tab.label}
                </span>
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center space-y-1 p-3 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                gameState.activeTab === tab.id 
                  ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-500/50 shadow-lg shadow-purple-500/20 animate-glow-active' 
                  : 'hover:bg-white/5 border border-transparent hover:border-white/10'
              }`}
            >
              <span className={`text-2xl ${gameState.activeTab === tab.id ? 'animate-bounce' : 'hover:animate-pulse'}`}>
                {tab.icon}
              </span>
              <span className={`text-xs font-semibold transition-colors ${
                gameState.activeTab === tab.id 
                  ? 'text-purple-300 animate-pulse' 
                  : 'text-gray-400 hover:text-white'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes glow-active {
          0%, 100% { 
            box-shadow: 0 10px 25px rgba(168, 85, 247, 0.3);
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
          }
          50% { 
            box-shadow: 0 15px 35px rgba(168, 85, 247, 0.5);
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8));
          }
        }
        
        @keyframes glow-gold {
          0%, 100% { 
            filter: drop-shadow(0 0 5px rgba(234, 179, 8, 0.4));
          }
          50% { 
            filter: drop-shadow(0 0 15px rgba(234, 179, 8, 0.8));
          }
        }
        
        .animate-glow-active {
          animation: glow-active 2s ease-in-out infinite;
        }
        
        .animate-glow-gold {
          animation: glow-gold 2s ease-in-out infinite;
        }
        
        @media (max-width: 640px) {
          .safe-area-pb {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
      `}</style>
    </div>
  );
};

export default Navigation;