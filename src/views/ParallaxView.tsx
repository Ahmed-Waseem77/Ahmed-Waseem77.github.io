import ParallaxLayer from '../components/ParallaxLayer';
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Info, Layers, Zap, MousePointer2 } from 'lucide-react';
import theme from '../theme';

const ParallaxView: React.FC = () => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`relative w-full h-[100dvh] ${theme.colors.bgMain} overflow-hidden`}>
      
      {/* --- BACKGROUND LAYER 1 (Deepest) --- */}
      <div className={`absolute inset-0 ${theme.colors.gradientMain} z-0 pointer-events-none`} />

      {/* --- BACKGROUND LAYER 2 (Distant Shapes) --- */}
      <ParallaxLayer speed={0.2} offset={scrollTop} className="pointer-events-none top-20">
        <div className={`absolute top-10 right-10 w-64 h-64 ${theme.shapes.primary} rounded-full blur-[100px] border-0`} />
        <div className={`absolute top-[800px] left-[-100px] w-96 h-96 ${theme.shapes.secondary} rounded-full blur-[120px]`} />
        <div className={`absolute top-[1600px] right-20 w-80 h-80 ${theme.shapes.tertiary} rounded-full blur-[100px] border-0`} />
      </ParallaxLayer>

      {/* --- BACKGROUND LAYER 3 (Mid-distance Elements) --- */}
      <ParallaxLayer speed={0.5} offset={scrollTop} className="pointer-events-none top-40">
        <div className="container mx-auto px-6 relative h-[2000px] opacity-30">
          <div className={`absolute top-32 left-10 text-9xl font-black ${theme.colors.textDark} select-none`}>DEPTH</div>
          <div className={`absolute top-[600px] right-10 text-9xl font-black ${theme.colors.textDark} select-none`}>SCROLL</div>
          <div className={`absolute top-[1200px] left-32 text-9xl font-black ${theme.colors.textDark} select-none`}>MOTION</div>
          
          {/* Decorative Grid Lines */}
          <div className="absolute top-0 right-1/4 w-px h-full bg-slate-800/50" />
          <div className="absolute top-0 left-1/4 w-px h-full bg-slate-800/50" />
        </div>
      </ParallaxLayer>

      {/* --- FOREGROUND LAYER 1 (Fast Elements) --- */}
      <ParallaxLayer speed={1.2} offset={scrollTop} className="pointer-events-none z-40 top-60">
        <div className="container mx-auto relative h-[2000px]">
          <div className={`absolute top-[400px] right-[10%] w-24 h-24 border-4 rounded-xl rotate-12 backdrop-blur-sm ${theme.shapes.primary} bg-transparent`} />
          <div className={`absolute top-[1100px] left-[5%] w-16 h-16 rotate-45 ${theme.shapes.secondary}`} />
          <div className={`absolute top-[1800px] right-[20%] w-32 h-32 border-2 rounded-full ${theme.shapes.tertiary} bg-transparent`} />
        </div>
      </ParallaxLayer>

       {/* --- FOREGROUND LAYER 2 (Very Close Elements) --- */}
      <ParallaxLayer speed={1.5} offset={scrollTop} className="pointer-events-none z-50 top-80">
         <div className="container mx-auto relative h-[2000px]">
           <div className="absolute top-[700px] left-0 w-8 h-32 bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent blur-sm" />
           <div className="absolute top-[1400px] right-0 w-8 h-48 bg-gradient-to-b from-transparent via-pink-400/20 to-transparent blur-sm" />
         </div>
      </ParallaxLayer>

      {/* --- MAIN CONTENT SCROLLER --- */}
      <div 
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden z-20 scroll-smooth custom-scrollbar"
        style={{ 
          zIndex: 1
        }}
      >
        <div className="min-h-[250vh] w-full pt-32 pb-32">
          
          <main className="container mx-auto px-6 max-w-4xl">
            {/* Header Section */}
            <section className="mb-48 relative">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 border ${theme.badges.primary}`}>
                <Zap className="w-4 h-4" />
                <span>Interactive Demo</span>
              </div>
              <h1 className={`text-6xl md:text-8xl font-bold ${theme.colors.textPrimary} mb-6 leading-tight`}>
                Parallax <br />
                <span className={theme.colors.textGradient}>
                  Scrolling
                </span>
              </h1>
              <p className={`text-xl ${theme.colors.textSecondary} max-w-2xl leading-relaxed`}>
                Scroll down to observe the multi-layer depth effect. Background elements move slower than this text, while foreground elements move faster.
              </p>
            </section>

            {/* Content Cards */}
            <section className="space-y-32">
              <div className={`${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary}`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerSecondary}`}>
                  <Layers className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} mb-4`}>Layered Architecture</h2>
                <p className={`${theme.colors.textSecondary} leading-relaxed`}>
                  This card sits on the standard content plane (Speed 1.0). The massive text "DEPTH" behind it is moving at Speed 0.5, creating the illusion that it is far behind the content. The small floating squares are moving at Speed 1.2, making them appear closer to you.
                </p>
              </div>

              <div className={`${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverTertiary} ml-12`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerTertiary}`}>
                  <MousePointer2 className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} mb-4`}>Responsive Events</h2>
                <p className={`${theme.colors.textSecondary} leading-relaxed`}>
                  The scroll position is tracked via a reference hook and updated using `requestAnimationFrame` for buttery smooth performance (60fps). React state updates the `translateY` CSS property of the background layers instantly.
                </p>
              </div>

              <div className={`${theme.colors.bgCard} ${theme.cards.base} ${theme.colors.borderSubtle} ${theme.cards.hoverPrimary} mr-12`}>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 ${theme.badges.iconContainerPrimary}`}>
                  <Zap className="w-6 h-6" />
                </div>
                <h2 className={`text-3xl font-bold ${theme.colors.textPrimary} mb-4`}>Performance First</h2>
                <p className={`${theme.colors.textSecondary} leading-relaxed`}>
                  Using CSS transforms (translate3d or translateY) ensures that repaints are minimized. The browser compositor handles the movement of layers, keeping the main thread free for interaction logic.
                </p>
              </div>

               <div className="h-64 flex items-center justify-center">
                  <p className={`${theme.colors.textMuted} text-sm`}>End of immersive scroll content</p>
               </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParallaxView;
