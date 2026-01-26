import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Info, X, Maximize2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface CarouselItem {
  id: string | number;
  src: string;
  alt?: string;
  tip?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  height?: string;
  autoPlay?: boolean;
  // New props for controlling size
  cardWidth?: string;  // e.g. "w-[60%] md:w-[45%]" or "w-[300px]"
  cardHeight?: string; // e.g. "aspect-[3/4]" or "h-[400px]"
  onIndexChange?: (index: number) => void;
}

const Carousel3D: React.FC<CarouselProps> = ({ 
  items, 
  height = "350px", 
  autoPlay = false,
  // Default values matching your previous hardcoded styles
  cardWidth = "w-[50%] md:w-[35%]",
  cardHeight = "aspect-[3/4]",
  onIndexChange
}) => {

  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex, onIndexChange]);
  const [isDragging, setIsDragging] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const startX = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // -- Navigation Logic --
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  // -- Drag / Swipe Logic --
  const handlePointerDown = (e: React.PointerEvent | React.TouchEvent) => {
    if (isExpanded) return;
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.PointerEvent).clientX;
    startX.current = clientX;
  };

  const handlePointerUp = (e: React.PointerEvent | React.TouchEvent) => {
    if (!isDragging || isExpanded) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.PointerEvent).clientX;
    const diff = startX.current - clientX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    
    setIsDragging(false);
  };

  // -- AutoPlay Logic --
  useEffect(() => {
    if (!autoPlay || isExpanded || isDragging) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, isExpanded, isDragging]);

  // -- Keyboard Support --
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
      if (!isExpanded) {
          if (e.key === 'ArrowRight') handleNext();
          if (e.key === 'ArrowLeft') handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);


  const getOffset = (index: number) => {
    const length = items.length;
    let offset = index - activeIndex;
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    return offset;
  };

  return (
    <>
      <div 
        className="relative w-full perspective-1000 flex flex-col items-center justify-center bg-transparent z-10"
        style={{ height }}
        ref={containerRef}
      >
        
        {/* --- CAROUSEL TRACK --- */}
        <div 
          className="relative w-full h-full flex items-center justify-center touch-none transform-style-3d"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={() => setIsDragging(false)}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
        >
          {items.map((item, index) => {
            const offset = getOffset(index);
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;

            if (absOffset > 2) return null; 

            let styles: React.CSSProperties = {
               transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
               position: 'absolute',
               zIndex: 50 - absOffset * 10,
            };

            if (isActive) {
              styles = { ...styles, 
                  transform: `translateX(0) scale(1) rotateY(0deg)`,
                  opacity: 1,
                  filter: 'grayscale(0%) brightness(100%)',
                  cursor: 'zoom-in'
              };
            } else if (offset === -1 || (offset === items.length - 1)) {
               styles = { ...styles, 
                  transform: `translateX(-60%) scale(0.85) rotateY(15deg) rotateZ(-2deg)`,
                  opacity: 0.6,
                  filter: 'grayscale(100%) brightness(70%) blur(1px)',
                  cursor: 'pointer'
              };
            } else if (offset === 1 || (offset === -(items.length - 1))) {
               styles = { ...styles, 
                  transform: `translateX(60%) scale(0.85) rotateY(-15deg) rotateZ(2deg)`,
                  opacity: 0.6,
                  filter: 'grayscale(100%) brightness(70%) blur(1px)',
                  cursor: 'pointer'
              };
            } else {
               styles = { ...styles, 
                  transform: `translateX(${offset * 40}%) scale(0.7)`,
                  opacity: 0,
              };
            }

            return (
              <div 
                key={item.id}
                // --- MODIFIED HERE: Using props for width and height ---
                className={`relative ${cardWidth} ${cardHeight} rounded-2xl shadow-2xl group transition-all`}
                style={styles}
                onClick={(e) => {
                  e.stopPropagation();
                  if (offset !== 0) {
                      setActiveIndex(index);
                  } else {
                      setIsExpanded(true);
                  }
                }}
              >
                <img 
                  src={item.src} 
                  alt={item.alt || ""} 
                  className="w-full h-full object-cover rounded-2xl border border-white/10 pointer-events-none select-none"
                />

                {isActive && (
                  <div className={`absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${theme.colors.bgMain} rounded-2xl`}>
                      <Maximize2 className="text-white drop-shadow-md w-12 h-12 opacity-80" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* --- CONTROLS --- */}
        {!isExpanded && (
            <div className="absolute bottom-4 flex gap-8 z-50">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className={`p-3 rounded-full ${theme.colors.bgCard} hover:${theme.colors.bgNav} backdrop-blur-md border border-white/20 transition-all active:scale-95 text-white`}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className={`p-3 rounded-full ${theme.colors.bgCard} hover:${theme.colors.bgNav} backdrop-blur-md border border-white/20 transition-all active:scale-95 text-white`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
        )}
      </div>

      {/* --- EXPANDED OVERLAY (PORTAL) --- */}
      {isExpanded && typeof document !== 'undefined' && createPortal(
        <div 
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
            style={{ backgroundColor: 'rgba(0,0,0, 0.25)', backdropFilter: 'blur(12px)' }}
            onClick={() => setIsExpanded(false)}
        >
            {/* Close Button */}
            <button 
                onClick={() => setIsExpanded(false)}
                className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            >
                <X size={32}
            style={{
             color: theme.colors.textPrimary
            }}
        />
            </button>

            {/* Main Content Wrapper */}
            <div 
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Expanded Image */}
                <img 
                    src={items[activeIndex].src} 
                    alt={items[activeIndex].alt} 
                    className="w-auto h-auto max-h-[65vh] max-w-full rounded-lg shadow-2xl object-contain"
                />

                {/* Description Box */}
                <div className={`mt-6 w-full ${theme.colors.bgMain} backdrop-blur-md p-6 rounded-xl max-w-2xl text-center shadow-xl`}>
                    <div className={`flex items-center justify-center gap-2 mb-2 text-sky-400`}>
                        <Info size={18} 
                style={{
                color: theme.hex.textHighlight
                }}
            />
                        <span className={`text-xs ${theme.colors.accentPrimary} font-bold uppercase tracking-widest`}>Info</span>
                    </div>
                    <p className={`${theme.colors.textHighlight} text-lg font-light leading-relaxed`}>
                        {items[activeIndex].tip || "No description available."}
                    </p>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Carousel3D;
