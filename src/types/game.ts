export interface TapEffect {
  id: number;
  x: number;
  y: number;
  points: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  level: number;
  icon: string;
  type: 'tap' | 'energy' | 'auto';
  multiplier: number;
}

export interface GameState {
  points: number;
  level: number;
  energy: number;
  maxEnergy: number;
  pointsPerTap: number;
  autoPointsPerSecond: number;
  activeTab: string;
  tapEffects: TapEffect[];
  upgrades: Upgrade[];
}
