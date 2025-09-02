import React from 'react';
import { useGame } from '../../context/GameContext'; 
import UpgradeCard from './UpgradeCard';

const UpgradesTab: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black p-4 sm:p-6 pb-24 animate-background">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-purple-400 rounded-full animate-float-particle opacity-60"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-pink-400 rounded-full animate-float-particle-delayed opacity-40"></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-particle opacity-50"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-purple-300 rounded-full animate-float-particle-delayed opacity-30"></div>
      </div>

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-slideDown">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-title-glow">
            Power Upgrades
          </h2>
          <p className="text-gray-400 text-sm animate-pulse">
            Enhance your mining capabilities
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4 rounded-full animate-pulse"></div>
        </div>
        
        {/* Upgrades List */}
        <div className="space-y-4">
          {gameState.upgrades.map((upgrade, index) => (
            <div 
              key={upgrade.id}
              className="animate-stagger"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <UpgradeCard upgrade={upgrade} />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center animate-fadeInUp">
          <p className="text-gray-500 text-xs animate-pulse">
            💡 Tip: Higher levels provide exponential benefits
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes background {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes slideDown {
          0% { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes stagger {
          0% { 
            opacity: 0; 
            transform: translateX(-20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes title-glow {
          0%, 100% { 
            filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.5));
            text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% { 
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8));
            text-shadow: 0 0 30px rgba(168, 85, 247, 0.6);
          }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.6;
          }
          33% { 
            transform: translateY(-20px) translateX(10px) rotate(120deg); 
            opacity: 1;
          }
          66% { 
            transform: translateY(10px) translateX(-15px) rotate(240deg); 
            opacity: 0.3;
          }
        }
        
        @keyframes float-particle-delayed {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.4;
          }
          33% { 
            transform: translateY(15px) translateX(-10px) rotate(-120deg); 
            opacity: 0.8;
          }
          66% { 
            transform: translateY(-10px) translateX(20px) rotate(-240deg); 
            opacity: 0.2;
          }
        }
        
        .animate-background {
          background-size: 300% 300%;
          animation: background 15s ease infinite;
        }
        
        .animate-slideDown {
          animation: slideDown 0.8s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out 0.5s both;
        }
        
        .animate-stagger {
          animation: stagger 0.6s ease-out both;
        }
        
        .animate-title-glow {
          animation: title-glow 3s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 8s ease-in-out infinite;
        }
        
        .animate-float-particle-delayed {
          animation: float-particle-delayed 10s ease-in-out infinite 2s;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .space-y-4 > * + * {
            margin-top: 1.5rem;
          }
        }
        
        /* Smooth scrolling */
        @media (prefers-reduced-motion: no-preference) {
          * {
            scroll-behavior: smooth;
          }
        }
        
        /* Dark theme enhancements */
        @media (prefers-color-scheme: dark) {
          body {
            background: #000000;
          }
        }
      `}</style>
    </div>
  );
};

export default UpgradesTab;