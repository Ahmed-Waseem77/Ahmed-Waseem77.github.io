import React, { useMemo } from 'react';
import { useTheme } from '../ThemeContext'; 
import { type ThemeType } from '../theme'; 

interface DynamicBackgroundProps {
  scrollTop: number;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ scrollTop }) => {
  const { theme } = useTheme();

  const colorKeys: (keyof ThemeType['hex'])[] = [
    'bgStandard',       
    'bgMain',   
    'borderSubtle', 
    'bgMain'        
  ];

  const { gradientString, bgHeightPercent } = useMemo(() => {
    const hexColors = colorKeys.map((key) => theme.hex[key]);
    const gradient = `linear-gradient(to bottom, ${hexColors.join(', ')})`;
    const height = hexColors.length * 1000;

    return { gradientString: gradient, bgHeightPercent: height };
  }, [theme]); 

  const CYCLE_HEIGHT = 5000; 
  const scrollProgress = Math.min(100, Math.max(0, (scrollTop / CYCLE_HEIGHT) * 100));

  return (
    <div 
      className="absolute inset-0 z-0 pointer-events-none transition-all duration-300 ease-linear"
      style={{
        backgroundImage: gradientString,
        // The background height is dynamic based on your list length
        backgroundSize: `100% ${bgHeightPercent}%`,
        backgroundPosition: `0% ${scrollProgress}%` 
      }}
    />
  );
};

export default DynamicBackground;
