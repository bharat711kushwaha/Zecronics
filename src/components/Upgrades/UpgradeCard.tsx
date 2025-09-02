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
    <div className="group animate-fadeIn">
      <div className="bg-gradient-to-r from-gray-900/80 to-black/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-[1.02] animate-glow-subtle">
        {/* Mobile Layout */}
        <div className="block sm:hidden">
          <div className="flex items-center space-x-3 mb-4">
            <div className="relative animate-float-icon">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl flex items-center justify-center shadow-lg border border-purple-400/30">
                <span className="text-2xl animate-pulse">{upgrade.icon}</span>
              </div>
              {upgrade.level > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-xs font-bold text-white">{upgrade.level}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-text-glow">
                {upgrade.name}
              </h3>
              <p className="text-sm text-gray-300 mb-2 animate-pulse">{upgrade.description}</p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-xs space-y-1">
              <p className="text-purple-300 animate-pulse">Level {upgrade.level}</p>
              {upgrade.type === 'tap' && (
                <p className="text-green-400 animate-glow-green">Next: +{nextLevelBonus} per tap</p>
              )}
              {upgrade.type === 'auto' && upgrade.level > 0 && (
                <p className="text-yellow-400 animate-glow-yellow">Current: +{upgrade.level * 2}/sec</p>
              )}
            </div>
          </div>

          {/* Button Row - Full Width */}
          <div className="w-full">
            <button
              onClick={() => handleUpgrade(upgrade.id)}
              disabled={!canAfford}
              className={`w-full px-4 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 ${
                canAfford
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:shadow-green-500/30 animate-button-ready'
                  : 'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed opacity-50 border border-gray-600'
              }`}
            >
              💎 {formatNumber(upgrade.cost)}
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden sm:block">
          <div className="flex items-center space-x-4">
            <div className="relative animate-float-icon">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl flex items-center justify-center shadow-lg border border-purple-400/30">
                <span className="text-2xl animate-pulse">{upgrade.icon}</span>
              </div>
              {upgrade.level > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-xs font-bold text-white">{upgrade.level}</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-lg bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent animate-text-glow">
                {upgrade.name}
              </h3>
              <p className="text-sm text-gray-300 mb-3 animate-pulse">{upgrade.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-xs space-y-1 flex-1">
                  <p className="text-purple-300 animate-pulse">Level {upgrade.level}</p>
                  {upgrade.type === 'tap' && (
                    <p className="text-green-400 animate-glow-green">Next: +{nextLevelBonus} per tap</p>
                  )}
                  {upgrade.type === 'auto' && upgrade.level > 0 && (
                    <p className="text-yellow-400 animate-glow-yellow">Current: +{upgrade.level * 2}/sec</p>
                  )}
                </div>
                
                {/* Button moved to the right with more space */}
                <div className="ml-6">
                  <button
                    onClick={() => handleUpgrade(upgrade.id)}
                    disabled={!canAfford}
                    className={`px-6 py-3 rounded-xl font-bold text-white transition-all duration-300 transform hover:scale-105 whitespace-nowrap ${
                      canAfford
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg hover:shadow-xl hover:shadow-green-500/30 animate-button-ready'
                        : 'bg-gradient-to-r from-gray-700 to-gray-800 cursor-not-allowed opacity-50 border border-gray-600'
                    }`}
                  >
                    💎 {formatNumber(upgrade.cost)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style >{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float-icon {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(2deg); }
        }
        
        @keyframes glow-subtle {
          0%, 100% { box-shadow: 0 4px 15px rgba(168, 85, 247, 0.2); }
          50% { box-shadow: 0 8px 25px rgba(168, 85, 247, 0.4); }
        }
        
        @keyframes text-glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.3)); }
          50% { filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.6)); }
        }
        
        @keyframes glow-green {
          0%, 100% { text-shadow: 0 0 5px rgba(74, 222, 128, 0.5); }
          50% { text-shadow: 0 0 15px rgba(74, 222, 128, 0.8); }
        }
        
        @keyframes glow-yellow {
          0%, 100% { text-shadow: 0 0 5px rgba(250, 204, 21, 0.5); }
          50% { text-shadow: 0 0 15px rgba(250, 204, 21, 0.8); }
        }
        
        @keyframes button-ready {
          0%, 100% { 
            box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
            filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.4));
          }
          50% { 
            box-shadow: 0 8px 25px rgba(34, 197, 94, 0.5);
            filter: drop-shadow(0 0 15px rgba(34, 197, 94, 0.6));
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-float-icon {
          animation: float-icon 3s ease-in-out infinite;
        }
        
        .animate-glow-subtle {
          animation: glow-subtle 3s ease-in-out infinite;
        }
        
        .animate-text-glow {
          animation: text-glow 2s ease-in-out infinite;
        }
        
        .animate-glow-green {
          animation: glow-green 2s ease-in-out infinite;
        }
        
        .animate-glow-yellow {
          animation: glow-yellow 2s ease-in-out infinite;
        }
        
        .animate-button-ready {
          animation: button-ready 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UpgradeCard;