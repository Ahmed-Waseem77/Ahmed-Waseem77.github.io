import React, { ReactNode } from 'react';

/**
 * ParallaxLayer Component
 */
interface ParallaxLayerProps {
  speed: number;
  offset: number;
  children?: React.ReactNode;
  className?: string;
}
const ParallaxLayer: React.FC<ParallaxLayerProps> = ({ speed, offset, children, className = "" }) => {
  return (
    <div 
      className={`absolute w-full top-0 left-0 will-change-transform ${className}`}
      style={{ 
        transform: `translateY(${-offset * (speed - 1)}px)`,
        zIndex: Math.round(speed * 10) 
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxLayer;
