import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Maximize2 } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface ExpandableImageProps {
  src: string;
  alt?: string;
  className?: string; // Controls the width/margin/shape of the card
  caption?: string;   // Text shown in the ribbon below the image
}

const ExpandableImage: React.FC<ExpandableImageProps> = ({ 
  src, 
  alt = "Image", 
  className = "w-full", 
  caption 
}) => {
  const { theme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    if (isExpanded) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded]);

  return (
    <>
      {/* --- PREVIEW CARD --- */}
      <div 
        className={`
            flex flex-col 
            overflow-hidden shadow-lg border border-white/10 
            ${theme.colors.bgCard} 
            ${className}
        `}
      >
        {/* 1. IMAGE CONTAINER 
            flex-1: Takes up all available vertical space NOT used by the caption.
            min-h-0: Allows this container to shrink if the text is long and height is fixed.
        */}
        <div 
            className="relative group cursor-zoom-in w-full flex-1 min-h-0"
            onClick={() => setIsExpanded(true)}
        >
            <img 
              src={src} 
              alt={alt} 
              // 2. object-cover + h-full: Ensures image fills the flexible space properly
              className="w-full h-full object-cover transition-transform duration-500" 
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg transform scale-75 group-hover:scale-100 duration-300" size={32} />
            </div>
        </div>

        {/* 3. CAPTION RIBBON 
            shrink-0: Prevents the caption from ever being cut off or squished.
            z-10: Ensures it sits above any image overflow if edge cases occur.
        */}
        {caption && (
            <div className={`p-3 border-t border-white/5 shrink-0 relative z-10 ${theme.colors.bgCard}`}>
                <p className={`${theme.colors.textSecondary} text-sm leading-relaxed break-words`}>
                   <span className={`${theme.colors.textPrimary} font-semibold mr-2`}>
                      Figure:
                   </span>
                   {caption}
                </p>
            </div>
        )}
      </div>

      {/* --- FULLSCREEN MODAL (Portal) --- */}
      {isExpanded && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ backgroundColor: 'rgba(0,0,0, 0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setIsExpanded(false)}
        >
          {/* Close Button */}
          <button 
            onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
            }}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 backdrop-blur-md border border-white/10"
          >
            <X size={24} />
          </button>

          {/* Expanded Content */}
          <div 
            className="relative max-w-6xl w-full max-h-[95vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()} 
          >
            <img 
              src={src} 
              alt={alt} 
              className="w-auto h-auto max-h-[75vh] max-w-full rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300"
            />

            {caption && (
                <div className={`mt-4 px-6 py-3 rounded-full ${theme.colors.bgMain} border border-white/10 backdrop-blur-xl shadow-2xl`}>
                    <p className={`${theme.colors.textPrimary} text-base font-light text-center`}>
                        {caption}
                    </p>
                </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default ExpandableImage;
