import React from 'react';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import Header from './components/Header/Header';
import GameArea from './components/GameArea/GameArea';
import UpgradesTab from './components/Upgrades/UpgradesTab';
import StatsTab from './components/Stats/StatsTab';
import Navigation from './components/Navigation/Navigation';

const ZecronicsApp: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 text-white overflow-x-hidden">
      <Header />
      
      {gameState.activeTab === 'home' && <GameArea />}
      {gameState.activeTab === 'upgrades' && <UpgradesTab />}
      {gameState.activeTab === 'stats' && <StatsTab />}
      
      <Navigation />

      <style>{`
        @keyframes tapEffect {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(1.2);
          }
        }
        .safe-area-pb {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <ZecronicsApp />
    </GameProvider>
  );
};

export default App;