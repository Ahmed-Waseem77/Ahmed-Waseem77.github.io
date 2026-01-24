import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface TimelineMagnifierProps {
  eras: string[];
  onChange: (index: number) => void;
}

const TimelineMagnifier: React.FC<TimelineMagnifierProps> = ({ eras, onChange }) => {
  const { theme } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [positionPercent, setPositionPercent] = useState(0); // 0 to 100

  // Handle snapping logic
  const handleSnap = (currentPercent: number) => {
    const snapPoints = [0, 50, 100];
    const closest = snapPoints.reduce((prev, curr) => {
      return (Math.abs(curr - currentPercent) < Math.abs(prev - currentPercent) ? curr : prev);
    });

    setPositionPercent(closest);
    
    const newIndex = snapPoints.indexOf(closest);
    if (newIndex !== -1 && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        onChange(newIndex);
    }
  };

  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const rect = trackRef.current.getBoundingClientRect();
    
    let newPercent = ((clientX - rect.left) / rect.width) * 100;
    newPercent = Math.max(0, Math.min(100, newPercent));
    
    setPositionPercent(newPercent);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    handleSnap(positionPercent);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);
    } else {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, positionPercent]);


  return (
    <div className="w-full max-w-lg mx-auto py-12 select-none">
        {/* --- TRACK --- */}
        <div 
            ref={trackRef}
            className={`relative h-1.5 rounded-full w-full flex items-center justify-between ${theme.colors.borderSubtle} bg-black/20`}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
        >
            {/* --- ERA CIRCLES --- */}
            {eras.map((era, index) => {
                const isActive = index === activeIndex;
                
                // Alignment Logic
                let alignmentStyle: React.CSSProperties = {};
                if (index === 0) alignmentStyle = { left: '0%' };
                else if (index === 1) alignmentStyle = { left: '50%', transform: 'translateX(-50%)' };
                else alignmentStyle = { right: '0%' };

                return (
                    <div 
                        key={index} 
                        className="absolute flex flex-col items-center pointer-events-none"
                        style={alignmentStyle}
                    >
                        {/* The Dot on the line */}
                        <div 
                            className={`w-3 h-3 rounded-full transition-all duration-300 z-10
                            ${!isActive ? 'bg-white/20' : ''}`}
                            style={isActive ? { 
                                backgroundColor: theme.hex.accentPrimary,
                                boxShadow: `0 0 10px ${theme.hex.accentPrimary}80`, // Adding 80 for alpha
                                transform: 'scale(1.25)'
                            } : {}}
                        />
                        
                        {/* Label below the dot */}
                        <span 
                            className={`absolute top-10 text-xs font-bold tracking-widest uppercase w-32 text-center transition-all duration-300
                            ${isActive 
                                ? `opacity-100 transform translate-y-0 ${theme.colors.accentPrimary}` 
                                : `opacity-50 transform -translate-y-1 ${theme.colors.textMuted}`
                            }
                        `}>
                            {era}
                        </span>
                    </div>
                );
            })}

            {/* --- PILL DRAGGABLE HANDLE --- */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 z-20 cursor-grab active:cursor-grabbing touch-none"
                style={{ 
                    left: `${positionPercent}%`,
                    transition: isDragging ? 'none' : 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onMouseDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            >
                {/* Visual Container centered on the point */}
                <div className="relative -translate-x-1/2 group">
                    
                    {/* The Pill Shape */}
                    <div 
                        className={`
                            h-10 px-5 rounded-full 
                            flex items-center gap-2
                            border transition-all duration-200 shadow-xl
                        `}
                        style={{
                            borderColor: isDragging ? theme.hex.accentPrimary : 'rgba(255,255,255,0.2)',
                            backgroundColor: isDragging ? `${theme.hex.bgStandard}` : `${theme.hex.bgStandard}`, // E6 = 90%, 80 = 50% opacity
                            boxShadow: isDragging ? `0 10px 25px -5px ${theme.hex.accentPrimary}40` : 'none',
                            transform: isDragging ? 'scale(1.05)' : 'scale(1)'
                        }}
                    >
                        {/* Left Chevron */}
                        <ChevronLeft 
                            size={14} 
                            // Using standard theme classes for text color
                            className={`transition-colors ${isDragging ? theme.colors.accentPrimary : theme.colors.textMuted}`} 
                        />

                        {/* Center Grip */}
                        <GripHorizontal 
                            size={16} 
                            className={`transition-colors ${isDragging ? theme.colors.textPrimary : theme.colors.textSecondary}`} 
                        />

                         {/* Right Chevron */}
                         <ChevronRight 
                            size={14} 
                            className={`transition-colors ${isDragging ? theme.colors.accentPrimary : theme.colors.textMuted}`} 
                        />
                    </div>
                    
                    {/* Dynamic Glow effect behind the pill */}
                    <div 
                        className={`absolute inset-0 rounded-full z-10 transition-opacity duration-300`}
                        style={{
                            backgroundColor: theme.hex.accentPrimary,
                            opacity: isDragging ? 0.3 : 0
                        }}
                    />

                </div>
            </div>
        </div>
    </div>
  );
};

export default TimelineMagnifier;
