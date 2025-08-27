import React, { createContext, useContext } from 'react';
import { useGameState } from '../hooks/useGameState'; 

type GameContextType = ReturnType<typeof useGameState>;

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const gameState = useGameState();
  return <GameContext.Provider value={gameState}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};