import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface SVGCarouselProps {
  items: React.ReactNode[];
  height?: string;
  onIndexChange?: (index: number) => void;
  autoPlay?: boolean;
  svgScale?: number;
  svgColor?: string;
  cardBackgroundClass?: string;
}

const SVGCarousel: React.FC<SVGCarouselProps> = ({ 
  items, 
  height = "300px", 
  onIndexChange,
  autoPlay = false,
  svgScale = 1.0,
  svgColor = "#000",
  cardBackgroundClass
}) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number>(0);

  // Sync state with parent safely
  useEffect(() => {
    onIndexChange?.(activeIndex);
  }, [activeIndex, onIndexChange]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // -- Swipe Logic --
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    startX.current = clientX;
  };

  const handlePointerUp = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.PointerEvent).clientX;
    const diff = startX.current - clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setIsDragging(false);
  };

  // -- AutoPlay --
  useEffect(() => {
    if (!autoPlay || isDragging) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [autoPlay, isDragging]);

  const getStyles = (index: number) => {
    const length = items.length;
    let offset = index - activeIndex;
    
    // Wrap around logic
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;

    const absOffset = Math.abs(offset);
    const isVisible = absOffset <= 2; 

    if (!isVisible) return { display: 'none' };

    const isActive = offset === 0;
    
    // --- CHANGED SETTINGS ---
    // 1. Spacing: Increased from 50 to 75 to separate items more
    // 2. Scaling: Increased drop from 0.15 to 0.35 (neighbors shrink to 65%)
    return {
      transform: `translateX(${offset * 75}%) scale(${1 - absOffset * 0.55})`,
      opacity: isActive ? 1 : 0.4,
      zIndex: 50 - absOffset * 10,
      filter: isActive ? 'none' : 'blur(2px) grayscale(80%) opacity(30%)',
      transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
      position: 'absolute' as 'absolute',
    };
  };

  return (
    <div 
      className="relative w-full flex flex-col items-center justify-center overflow-visible"
      style={{ height }}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center touch-none"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => setIsDragging(false)}
        onTouchStart={handlePointerDown}
        onTouchEnd={handlePointerUp}
      >
        {items.map((item, index) => (
          <div 
            key={index}
            className="w-[40%] md:w-[30%] aspect-square flex items-center justify-center relative"
            style={getStyles(index)}
          >
             {/* 1. THE SHADOW/VIGNETTE BOX 
                - Changed z-index to 0 (behind SVG)
                - Added opacity-100 to ensure visibility
             */}
             <div className={`
                  absolute inset-0 rounded-full z-0
                  `}
                  style={{
                      // Fallback strong vignette if no class provided
                      background: `radial-gradient(circle, ${theme.hex.borderSubtle}4C 0%, ${theme.hex.bgMain}00 70%)`,
                      transform: `translateY(15%) scale(${svgScale+0.2})`
                  }}
             />

            {/* 2. THE SVG CONTAINER 
                - Changed z-index to 10 (in front of vignette)
            */}
            <div 
                className="w-full h-full pointer-events-none relative z-10 flex items-center justify-center"
                style={{ 
			transform: `scale(${svgScale})`,
			color: svgColor
		}}
            >
                {item}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 flex gap-12 z-50">
        <button 
          onClick={handlePrev}
          className={`p-2 rounded-full backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 ${theme.colors.textPrimary}`}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={handleNext}
          className={`p-2 rounded-full backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 ${theme.colors.textPrimary}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default SVGCarousel;
