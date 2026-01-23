import ParallaxLayer from '../components/ParallaxLayer';
import BackgroundLayer2 from '../components/BackgroundLayer2';
import BackgroundLayer3 from '../components/BackgroundLayer3';
import DynamicBackground from '../components/DynamicBackground';

import React, { useState, useEffect, useRef } from 'react';
import { Zap, MousePointer2, BadgeQuestionMark } from 'lucide-react';

import { useTheme } from '../ThemeContext'; 
import FadingGrid from '../components/FadingGrid';

const ParallaxView: React.FC = () => {
  const { theme } = useTheme();
  
  // 1. Scroll State
  const [scrollTop, setScrollTop] = useState<number>(0);
  
  // 2. Active Slide State
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3. Section Refs
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // --- EFFECT 1: SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        requestAnimationFrame(() => {
          if (containerRef.current) {
            setScrollTop(containerRef.current.scrollTop);
          }
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // --- EFFECT 2: INTERSECTION OBSERVER ---
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setActiveSlide(index);
        }
      });
    }, {
      threshold: 0.5,
    });

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // FIXED: Changed 'z-100' (invalid) to 'z-30' (valid) to ensure content sits on top
  const slideClass = "h-[100dvh] w-full snap-center flex flex-col justify-center relative z-30 items-center p-6";

  return (
    <div className={`relative w-full h-[100dvh] ${theme.colors.bgMain} overflow-hidden`}>
      
      {/* --- BACKGROUND LAYERS (Z-0) --- */}
      {/* We keep these at z-0 or z-auto so they stay behind the content scroller */}
      <DynamicBackground scrollTop={scrollTop}/>

      <ParallaxLayer speed={0.2} offset={scrollTop} className="pointer-events-none z-0 top-20">
          <BackgroundLayer2 isVisible={activeSlide === 3}/>
      </ParallaxLayer>

      <ParallaxLayer speed={0.5} offset={scrollTop} className="pointer-events-none z-0 top-40">
          <BackgroundLayer3 isVisible={activeSlide === 3}/>
      </ParallaxLayer>

      <ParallaxLayer speed={1.2} offset={scrollTop} className="pointer-events-none z-0 top-60">
        {/* Foreground Layer Content */}
      </ParallaxLayer>

      {/* --- MAIN CONTENT SCROLLER (Z-10) --- */}
      <div 
        ref={containerRef}
        // FIXED: Added z-10 class explicitly. 
        // snap-mandatory ensures rigid "slideshow" feel.
        className="absolute inset-0 overflow-y-auto overflow-x-hidden z-10 scroll-smooth custom-scrollbar snap-y snap-mandatory"
      >
        
        <FadingGrid />
        {/* --- SLIDE 0: HERO / TITLE --- */}
        <section 
            className={slideClass}
            data-index="0"
            ref={el => (sectionRefs.current[0] = el)}
        >
            <div className="container mx-auto px-6 max-w-6xl text-center md:text-left">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border ${theme.badges.primary}`}>
                  <Zap className="w-4 h-4" />
                  <span>Digital Tourguide Experience</span>
                </div>
                <h1 className={`text-6xl md:text-8xl font-bold ${theme.colors.textPrimary} mb-6 leading-tight`}>
                  Ancient<br />
                  <span className={theme.colors.textGradient}>
                    Art & Architecture
                  </span>
                </h1>
                <p className={`text-xl ${theme.colors.textSecondary} max-w-2xl leading-relaxed mb-12`}>
                  A journey through Ancient Egypt Art & Architecture across the ancient pharaonic and greco-roman eras.
                </p>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                    <MousePointer2 className={`w-6 h-6 ${theme.colors.textMuted}`} />
                </div>
            </div>
            <div className="container mx-auto px-6 max-w-6xl">
              <div className={`w-full p-8 md:p-12 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
                <span className="inline-flex items-center mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${theme.badges.iconContainerSecondary}`}>
                      <BadgeQuestionMark className="w-6 h-6" />
                    </div>
                    <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} ml-4`}>Digital Tourguide?</h2>
                </span>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
                    This digital tour guide is designed for a wide audience, including university
                    students, tourists without access to professional tour guides, and visitors who
                    participated in guided tours but found the pace or explanations overwhelming.
                </p>
              </div>
            </div>
        </section>


        {/* --- SLIDE 2: RESPONSIVE EVENTS --- */}
        <section 
            className={slideClass}
            data-index="2"
            ref={el => (sectionRefs.current[2] = el)}
        >
            <div className="container mx-auto px-6 max-w-6xl">
              <div className={`w-full p-8 md:p-12 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverTertiary}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerTertiary}`}>
                  <MousePointer2 className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} mb-4`}>Responsive Events</h2>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
                  The scroll position is tracked via a reference hook and updated using `requestAnimationFrame` for buttery smooth performance.
                </p>
              </div>
            </div>
        </section>

        {/* --- SLIDE 3: PERFORMANCE FIRST --- */}
        <section 
            className={slideClass}
            data-index="3"
            ref={el => (sectionRefs.current[3] = el)}
        >
            <div className="container mx-auto px-6 max-w-6xl">
              {/* FIXED: Removed solid background variable, added bg-black/40 for glass effect */}
              <div className={`
                 backdrop-blur-md 
                 w-full p-8 md:p-12 
		 ${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} 
                 ${theme.cards.hoverPrimary}
              `}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerPrimary}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} mb-4`}>Performance First</h2>
                <p className={`${theme.colors.textSecondary} text-lg leading-relaxed`}>
                  Using CSS transforms (translate3d or translateY) ensures that repaints are minimized. The browser compositor handles the movement of layers.
                </p>
              </div>
            </div>
        </section>

        {/* --- SPACERS --- */}
        <section className={`${slideClass} h-[50vh]`} data-index="4" ref={el => (sectionRefs.current[4] = el)}>
           <p className={`${theme.colors.textMuted} text-sm`}>End of immersive scroll content</p>
        </section>

      </div>
    </div>
  );
};

export default ParallaxView;
