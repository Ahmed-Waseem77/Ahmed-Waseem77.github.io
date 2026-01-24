import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface TimelineMagnifierProps {
  eras: string[]; // Pass in your array of 6 eras here
  onChange: (index: number) => void;
}

const TimelineMagnifier: React.FC<TimelineMagnifierProps> = ({ eras, onChange }) => {
  const { theme } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [positionPercent, setPositionPercent] = useState(0); 

  // Dynamically calculate snap points based on the number of eras
  // For 6 eras, steps will be: 0, 20, 40, 60, 80, 100
  const step = 100 / (Math.max(1, eras.length - 1));
  
  const handleSnap = (currentPercent: number) => {
    // Generate snap points dynamically
    const snapPoints = eras.map((_, i) => i * step);
    
    // Find closest snap point
    const closest = snapPoints.reduce((prev, curr) => {
      return (Math.abs(curr - currentPercent) < Math.abs(prev - currentPercent) ? curr : prev);
    });

    setPositionPercent(closest);
    
    // Calculate index from the snap point
    // We round to handle floating point imprecision (e.g. 19.99999)
    const newIndex = Math.round(closest / step);
    
    if (newIndex !== activeIndex && newIndex >= 0 && newIndex < eras.length) {
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
    <div className="w-full max-w-2xl mx-auto py-16 select-none relative">
        {/* --- TRACK --- */}
        <div 
            ref={trackRef}
            className={`relative h-1 rounded-full w-full flex items-center ${theme.colors.borderSubtle} bg-black/20`}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onMouseMove={handlePointerMove}
        >
            {/* --- ERA CIRCLES --- */}
            {eras.map((era, index) => {
                const isActive = index === activeIndex;
                const leftPos = `${index * step}%`;

                return (
                    <div 
                        key={index} 
                        className="absolute flex flex-col items-center pointer-events-none"
                        style={{ left: leftPos, transform: 'translateX(-50%)' }}
                    >
                        {/* The Dot on the line */}
                        <div 
                            className={`w-2 h-2 rounded-full transition-all duration-300 z-10
                            ${!isActive ? 'bg-white/30' : ''}`}
                            style={isActive ? { 
                                backgroundColor: theme.hex.accentPrimary,
                                boxShadow: `0 0 10px ${theme.hex.accentPrimary}`, 
                                transform: 'scale(1.5)'
                            } : {}}
                        />
                        
                        {/* Label below the dot */}
                        <span 
                            className={`absolute top-6 text-[10px] font-bold tracking-widest uppercase w-24 text-center transition-all duration-300
                            ${isActive 
                                ? `opacity-100 transform translate-y-0 ${theme.colors.accentPrimary}` 
                                : `opacity-40 transform -translate-y-1 ${theme.colors.textMuted}`
                            }
                        `}>
                            {era}
                        </span>
                    </div>
                );
            })}

            {/* --- PILL DRAGGABLE HANDLE --- */}
            <div 
                className="absolute -top-10 z-20 cursor-grab active:cursor-grabbing touch-none"
                style={{ 
                    left: `${positionPercent}%`,
                    transition: isDragging ? 'none' : 'left 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                }}
                onPointerDown={handlePointerDown}
                onTouchStart={handlePointerDown}
            >
                {/* Visual Container centered on the point */}
                <div className="relative -translate-x-1/2 group">
                    
                    {/* The Sleek Pill Shape */}
                    <div 
                        className={`
                            h-7 px-3 rounded-full 
                            flex items-center gap-1.5
                            border transition-all duration-200 shadow-lg backdrop-blur-sm
                        `}
                        style={{
                            borderColor: isDragging ? theme.hex.accentPrimary : 'rgba(255,255,255,0.15)',
                            backgroundColor: isDragging ? `${theme.hex.bgStandard}` : `${theme.hex.bgStandard}`, 
                            boxShadow: isDragging ? `0 5px 15px -3px ${theme.hex.accentPrimary}30` : '0 4px 6px -1px rgba(0,0,0,0.1)',
                            transform: isDragging ? 'scale(1.05) translateY(-2px)' : 'scale(1) translateY(0)'
                        }}
                    >
                        {/* Left Chevron */}
                        <ChevronLeft 
                            size={12} 
                            className={`transition-colors ${isDragging ? theme.colors.accentPrimary : theme.colors.textMuted}`} 
                        />

                        {/* Center Arrow Down Symbol */}
                        <ArrowDown 
                            size={14} 
                            className={`transition-colors ${isDragging ? theme.colors.textPrimary : theme.colors.textSecondary}`} 
                        />

                         {/* Right Chevron */}
                         <ChevronRight 
                            size={12} 
                            className={`transition-colors ${isDragging ? theme.colors.accentPrimary : theme.colors.textMuted}`} 
                        />
                    </div>
                    
                    {/* Tiny triangle tip pointing down to the line */}
                    <div 
                        className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] absolute left-1/2 -translate-x-1/2 -bottom-[5px]"
                        style={{ borderTopColor: isDragging ? theme.hex.accentPrimary : 'rgba(255,255,255,0.15)' }}
                    />

                </div>
            </div>
        </div>
    </div>
  );
};

export default TimelineMagnifier;
