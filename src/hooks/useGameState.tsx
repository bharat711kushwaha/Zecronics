import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, TapEffect, Upgrade } from '../types/game';

const initialUpgrades: Upgrade[] = [
  { 
    id: 'tap_power', 
    name: 'Tap Booster', 
    description: 'Increase points per tap',
    cost: 100, 
    level: 1, 
    icon: '👆',
    type: 'tap',
    multiplier: 1
  },
  { 
    id: 'energy_boost', 
    name: 'Energy Core', 
    description: 'Increase maximum energy',
    cost: 500, 
    level: 0, 
    icon: '🔋',
    type: 'energy',
    multiplier: 100
  },
  { 
    id: 'auto_miner', 
    name: 'Auto Miner', 
    description: 'Earn points automatically',
    cost: 1000, 
    level: 0, 
    icon: '🤖',
    type: 'auto',
    multiplier: 2
  }
];

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    points: 0,
    level: 1,
    energy: 1500,
    maxEnergy: 1500,
    pointsPerTap: 1,
    autoPointsPerSecond: 0,
    activeTab: 'home',
    tapEffects: [],
    upgrades: initialUpgrades
  });

  const effectIdRef = useRef(0);

  // Energy regeneration
  useEffect(() => {
    const energyTimer = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        energy: Math.min(prev.energy + 2, prev.maxEnergy)
      }));
    }, 100);
    return () => clearInterval(energyTimer);
  }, []);

  // Auto mining
  useEffect(() => {
    if (gameState.autoPointsPerSecond > 0) {
      const autoTimer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          points: prev.points + prev.autoPointsPerSecond
        }));
      }, 1000);
      return () => clearInterval(autoTimer);
    }
  }, [gameState.autoPointsPerSecond]);

  // Level calculation
  useEffect(() => {
    const newLevel = Math.floor(gameState.points / 10000) + 1;
    if (newLevel > gameState.level) {
      setGameState(prev => ({ ...prev, level: newLevel }));
    }
  }, [gameState.points]);

  const handleTap = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (gameState.energy < 15) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newEffect: TapEffect = {
      id: effectIdRef.current++,
      x,
      y,
      points: gameState.pointsPerTap
    };

    setGameState(prev => ({
      ...prev,
      points: prev.points + prev.pointsPerTap,
      energy: Math.max(prev.energy - 15, 0),
      tapEffects: [...prev.tapEffects, newEffect]
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        tapEffects: prev.tapEffects.filter(effect => effect.id !== newEffect.id)
      }));
    }, 1000);
  }, [gameState.energy, gameState.pointsPerTap]);

  const handleUpgrade = useCallback((upgradeId: string) => {
    const upgrade = gameState.upgrades.find(u => u.id === upgradeId);
    if (!upgrade || gameState.points < upgrade.cost) return;

    setGameState(prev => {
      const newUpgrades = prev.upgrades.map(u => {
        if (u.id === upgradeId) {
          return {
            ...u,
            level: u.level + 1,
            cost: Math.floor(u.cost * 1.6)
          };
        }
        return u;
      });

      const newUpgrade = newUpgrades.find(u => u.id === upgradeId)!;
      let newPointsPerTap = prev.pointsPerTap;
      let newMaxEnergy = prev.maxEnergy;
      let newAutoPoints = prev.autoPointsPerSecond;

      if (upgradeId === 'tap_power') {
        newPointsPerTap = newUpgrade.level;
      } else if (upgradeId === 'energy_boost') {
        newMaxEnergy = 1500 + (newUpgrade.level * 100);
      } else if (upgradeId === 'auto_miner') {
        newAutoPoints = newUpgrade.level * 2;
      }

      return {
        ...prev,
        points: prev.points - upgrade.cost,
        upgrades: newUpgrades,
        pointsPerTap: newPointsPerTap,
        maxEnergy: newMaxEnergy,
        autoPointsPerSecond: newAutoPoints
      };
    });
  }, [gameState]);

  const setActiveTab = useCallback((tab: string) => {
    setGameState(prev => ({ ...prev, activeTab: tab }));
  }, []);

  return { gameState, handleTap, handleUpgrade, setActiveTab };
};