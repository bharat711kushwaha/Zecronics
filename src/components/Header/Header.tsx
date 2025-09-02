import React from 'react';
import { useGame } from '../../context/GameContext'; 
import { formatNumber, calculateLevelProgress } from '../../utils/formatters';
import EnergyBar from './EnergyBar';

const Header: React.FC = () => {
  const { gameState } = useGame();
  const levelProgress = calculateLevelProgress(gameState.points);

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-black to-gray-900 p-4 sm:p-6 shadow-2xl animate-pulse-slow">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">
        {/* Mobile Layout - Stack vertically */}
        <div className="block sm:hidden">
          {/* Top Row - Logo, Title */}
          <div className="flex items-center justify-center mb-4">
            {/* Logo + Title */}
            <div className="flex items-center space-x-3 animate-float">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Zycronex Logo" 
                  className="w-12 h-12 object-cover rounded-full shadow-lg border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-xs font-bold text-white">{gameState.level}</span>
                </div>
              </div>
              <div className="text-center">
                {/* Replace text with image */}
                <img 
                  src="/abc.png" 
                  alt="Zycronex" 
                  className="h-12 w-auto object-contain max-w-[120px]"
                  onError={(e) => {
                    // Fallback to text if image doesn't load
                    e.currentTarget.style.display = 'none';
                    const textElement = document.createElement('h1');
                    textElement.className = 'text-xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent';
                    textElement.textContent = 'Zycronex';
                    e.currentTarget.parentNode?.appendChild(textElement);
                  }}
                />
                <span className="text-xs text-purple-300 block animate-pulse">Level {gameState.level}</span>
              </div>
            </div>
          </div>

          {/* Bottom Row - Points and Progress */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 animate-glow">
              <img 
                src="/gold.png" 
                alt="Diamond" 
                className="w-6 h-6 object-contain animate-bounce"
                onError={(e) => {
                  // Fallback to emoji if image doesn't load
                  e.currentTarget.style.display = 'none';
                  const emojiElement = document.createElement('span');
                  emojiElement.className = 'text-2xl animate-bounce';
                  emojiElement.textContent = '💎';
                  e.currentTarget.parentNode?.insertBefore(emojiElement, e.currentTarget.nextSibling);
                }}
              />
              <span className="text-xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {formatNumber(gameState.points)}
              </span>
              <span className="text-xs text-purple-300">Zec Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-700/50 rounded-full overflow-hidden border border-purple-500/30">
                <div 
                  className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000 animate-pulse"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between mb-6">
            {/* Left - Logo + Title */}
            <div className="flex items-center space-x-4 animate-float">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Zycronex Logo" 
                  className="w-16 h-16 object-cover rounded-full shadow-lg border-2 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMjgiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMkwxMy4wOSA4LjI2TDIxIDlMMTMuMDkgMTUuNzRMMTIgMjJMMTAuOTEgMTUuNzRMMyA5TDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <span className="text-sm font-bold text-white">{gameState.level}</span>
                </div>
              </div>

              <div>
                {/* Replace text with image */}
                <img 
                  src="/abc.png" 
                  alt="Zycronex" 
                  className="h-10 w-auto object-contain mb-2"
                  onError={(e) => {
                    // Fallback to text if image doesn't load
                    e.currentTarget.style.display = 'none';
                    const textElement = document.createElement('h1');
                    textElement.className = 'text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2';
                    textElement.textContent = 'Zycronex';
                    e.currentTarget.parentNode?.appendChild(textElement);
                  }}
                />
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-purple-300 animate-pulse">Level {gameState.level}</span>
                  <div className="w-24 h-2 bg-gray-700/50 rounded-full overflow-hidden border border-purple-500/30">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-1000 animate-pulse"
                      style={{ width: `${levelProgress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Points Only */}
            <div className="text-right animate-glow">
              <div className="flex items-center space-x-3 mb-2">
                <img 
                  src="/gold.png" 
                  alt="Diamond" 
                  className="w-10 h-10 object-contain animate-bounce"
                  onError={(e) => {
                    // Fallback to emoji if image doesn't load
                    e.currentTarget.style.display = 'none';
                    const emojiElement = document.createElement('span');
                    emojiElement.className = 'text-4xl animate-bounce';
                    emojiElement.textContent = '💎';
                    e.currentTarget.parentNode?.insertBefore(emojiElement, e.currentTarget.nextSibling);
                  }}
                />
                <span className="text-4xl font-bold text-white bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {formatNumber(gameState.points)}
                </span>
              </div>
              <p className="text-sm text-purple-300 animate-pulse">Zec Points</p>
            </div>
          </div>
        </div>

        {/* Energy Bar - Full Width on All Devices */}
        <EnergyBar energy={gameState.energy} maxEnergy={gameState.maxEnergy} />
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(168, 85, 247, 0.4)); }
          50% { filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Header;