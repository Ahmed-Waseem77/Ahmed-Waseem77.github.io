import React from 'react';
import { useTheme } from '../ThemeContext'; 

interface FadingGridProps {
  opacity?: number;    // Opacity of the lines (0.0 to 1.0)
  size?: number;       // Size of the grid squares in px
}


const FadingGrid: React.FC<FadingGridProps> = ({ 
  opacity = 0.1, 
  size = 50 
}) => { 
  const { theme, toggleTheme, isDarkMode } = useTheme();
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      {/* 1. The Grid Pattern */}
      <div 
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.hex.textPrimary} 1px, transparent 1px), linear-gradient(to bottom, ${theme.hex.textPrimary} 1px, transparent 1px)`,
          backgroundSize: `${size}px ${size}px`,
          opacity: opacity,
        }}
      />

      {/* 2. The Fade Mask (Vignette) */}
      {/* This overlay creates the fade effect using a mask-image */}
     <div 
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" 
        style={{ backgroundColor: theme.hex.bgMain }}
      /> 
    </div>
  );
};

export default FadingGrid;
