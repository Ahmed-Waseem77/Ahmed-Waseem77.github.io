import React, { useMemo } from 'react';
import { Ancient } from '../theme';
import { useTheme } from '../ThemeContext';
import NuutStar from '../assets/NuutStar'; 

interface StarFieldProps {
  count?: number;        // How many stars to pick from the grid
  rowCount?: number;     // How many rows high
  colCount?: number;     // How many columns wide
  baseSize?: number;
  className?: string;
  style?: React.CSSProperties;
}

const StarField: React.FC<StarFieldProps> = ({ 
  count = 100, 
  rowCount = 50,
  colCount = 10,
  baseSize = 12,
  className = "", 
  style = {} 
}) => {
  const { theme } = useTheme();

  const stars = useMemo(() => {
    // 1. Create ALL possible grid positions
    const allSlots = [];
    
    // Percentage dimensions for each cell
    const rowHeight = 100 / rowCount;
    const colWidth = 100 / colCount;

    for (let r = 0; r < rowCount; r++) {
      for (let c = 0; c < colCount; c++) {
        
        // Calculate Center X and Y of the cell
        let x = (c * colWidth) + (colWidth / 2);
        const y = (r * rowHeight) + (rowHeight / 2);

        // STAGGER LOGIC: Shift every odd row to the right by half a column
        if (r % 2 === 1) {
          x += colWidth / 2;
        }

        // Only add if it's (mostly) inside the screen 
        // (optional: allows stars to hang off the right edge)
        if (x <= 100 + (colWidth/2)) {
          allSlots.push({ r, c, x, y });
        }
      }
    }

    // 2. Fisher-Yates Shuffle to randomize which slots get a star
    for (let i = allSlots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allSlots[i], allSlots[j]] = [allSlots[j], allSlots[i]];
    }

    // 3. Slice the array to get exactly 'count' stars
    // We also generate the random appearance props here
    return allSlots.slice(0, count).map((slot, i) => ({
      id: `star-${slot.r}-${slot.c}`, // Unique ID based on grid pos
      x: slot.x,
      y: slot.y,
      scale: 1, 
      rotation: Math.random() * 360, 
      duration: 3 + Math.random() * 4, 
      delay: Math.random() * 2,
    }));

  }, [count, rowCount, colCount]);

  return (
    <div 
      className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={style} 
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            top: `${star.y}%`,
            left: `${star.x}%`,
            width: `${baseSize * star.scale}px`,
            height: `${baseSize * star.scale}px`,
            transform: `translate(-50%, -50%)`,
            animationDuration: `${star.duration}s`, 
            animationDelay: `${star.delay}s`,
            color: `${Ancient.colors['royal-gold'][300]}`,
          }}
        >
          <NuutStar className="w-full h-full" />
        </div>
      ))}
    </div>
  );
};

export default StarField;
