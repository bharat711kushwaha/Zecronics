import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { useGame } from './context/GameContext';
import Header from './components/Header/Header';
import GameArea from './components/GameArea/GameArea';
import UpgradesTab from './components/Upgrades/UpgradesTab';
import StatsTab from './components/Stats/StatsTab';
import Navigation from './components/Navigation/Navigation';
import HomePage from './pages/HomePage';
import CryptoDashboardPage from './pages/CryptoDashboard';

// Income Pages
import DirectIncomePage from './pages/DirectIncomePage';
import LevelIncomePage from './pages/LevelIncomePage';
import ROIIncomePage from './pages/ROIIncomePage';
import BonusIncomePage from './pages/BonusIncomePage';
import TotalIncomePage from './pages/TotalIncomePage';

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
      <Router>
        <Routes>
          {/* Main Game UI */}
          <Route path="/" element={<ZecronicsApp />} />

          {/* Investment Page */}
          <Route path="/investment" element={<HomePage />} />
                    <Route path="/investment/dashboard" element={<CryptoDashboardPage />} />
          
          {/* Income Report Routes */}
          <Route path="/investment/income/direct" element={<DirectIncomePage />} />
          <Route path="/investment/income/level" element={<LevelIncomePage />} />
          <Route path="/investment/income/roi" element={<ROIIncomePage />} />
          <Route path="/investment/income/bonus" element={<BonusIncomePage />} />
          <Route path="/investment/income/total" element={<TotalIncomePage />} />

        </Routes>
      </Router>
    </GameProvider>
  );
};

export default App;
