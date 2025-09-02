import React from 'react';
import { useGame } from '../../context/GameContext'; 
import { formatNumber, calculateLevelProgress } from '../../utils/formatters';
import EnergyBar from './EnergyBar';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const { gameState } = useGame();
  const levelProgress = calculateLevelProgress(gameState.points);

  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 p-4 sm:p-6 shadow-2xl">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10">
        {/* Mobile Layout - Stack vertically */}
        <div className="block sm:hidden">
          {/* Top Row - Logo, Title, and Investment Button */}
          <div className="flex items-center justify-between mb-3">
            {/* Left - Logo + Title */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Zycronex Logo" 
                  className="w-10 h-10 object-cover rounded-full shadow-lg border-2 border-white/20"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMSA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDMgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{gameState.level}</span>
                </div>
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Zycronex</h1>
                <span className="text-xs text-blue-200">Level {gameState.level}</span>
              </div>
            </div>

            {/* Right - Investment Button */}
            <Link 
              to="/investment" 
              className="px-3 py-1.5 bg-yellow-500 text-black text-xs font-bold rounded-lg shadow-md hover:bg-yellow-400 transition-all"
            >
              Invest
            </Link>
          </div>

          {/* Bottom Row - Points and Progress */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="text-xl">💎</span>
              <span className="text-xl font-bold text-white">{formatNumber(gameState.points)}</span>
              <span className="text-xs text-blue-200">Zec Points</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by side */}
        <div className="hidden sm:block">
          <div className="flex items-center justify-between mb-4">
            {/* Left - Logo + Title */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src="/logo.png" 
                  alt="Zycronex Logo" 
                  className="w-14 h-14 object-cover rounded-full shadow-lg border-2 border-white/20"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iNTYiIHZpZXdCb3g9IjAgMCA1NiA1NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjgiIGN5PSIyOCIgcj0iMjgiIGZpbGw9IiNGRkQ3MDAiLz4KPHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMiIgeT0iMTIiPgo8cGF0aCBkPSJNMTIgMkwxMy4wOSA4LjI2TDIxIDlMMTMuMDkgMTUuNzRMMTIgMjJMMTAuOTEgMTUuNzRMMyA5TDEwLjkxIDguMjZMMTIgMloiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                  }}
                />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{gameState.level}</span>
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-white mb-1">Zycronex</h1>
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

            {/* Right - Points + Investment Button */}
            <div className="text-right flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-3xl">💎</span>
                  <span className="text-3xl font-bold text-white">{formatNumber(gameState.points)}</span>
                </div>
                <p className="text-sm text-blue-200">Zec Points</p>
              </div>

              <Link 
                to="/investment" 
                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg shadow-md hover:bg-yellow-400 transition-all whitespace-nowrap"
              >
                Investment
              </Link>
            </div>
          </div>
        </div>

        {/* Energy Bar - Full Width on All Devices */}
        <EnergyBar energy={gameState.energy} maxEnergy={gameState.maxEnergy} />
      </div>
    </div>
  );
};

export default Header;