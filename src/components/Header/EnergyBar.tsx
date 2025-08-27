import React from 'react';

interface EnergyBarProps {
  energy: number;
  maxEnergy: number;
}

const EnergyBar: React.FC<EnergyBarProps> = ({ energy, maxEnergy }) => {
  const percentage = (energy / maxEnergy) * 100;

  return (
    <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/20">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-yellow-400">⚡</span>
          <span className="text-sm font-semibold text-white">Energy</span>
        </div>
        <span className="text-sm text-white">{energy}/{maxEnergy}</span>
      </div>
      <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-full rounded-full transition-all duration-300 shadow-lg"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
export default EnergyBar;