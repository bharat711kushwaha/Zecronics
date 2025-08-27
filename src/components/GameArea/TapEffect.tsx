import React from 'react';
import type { TapEffect as TapEffectType } from '../../types/game';

interface TapEffectProps {
  effect: TapEffectType;
}

const TapEffect: React.FC<TapEffectProps> = ({ effect }) => {
  return (
    <div
      className="absolute text-yellow-400 font-bold text-3xl pointer-events-none z-20"
      style={{
        left: effect.x - 15,
        top: effect.y - 15,
        animation: 'tapEffect 1s ease-out forwards'
      }}
    >
      +{effect.points}
    </div>
  );
};

export default TapEffect;