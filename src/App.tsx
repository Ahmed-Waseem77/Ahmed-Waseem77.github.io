import React, { useState } from 'react';
import { Menu, X, Home, Info, Layers, Zap, MousePointer2 } from 'lucide-react';
import Navigation from './components/Navigation';
import ParallaxView from './views/ParallaxView';
import StandardPage from './views/StandardPage';
import theme from './theme';

export default function App() {
  const [activePage, setActivePage] = useState<PageType>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  return (
    <div className={`flex flex-col h-screen w-full ${theme.colors.bgMain} ${theme.colors.textHighlight} font-sans selection:bg-emerald-500/30`}>
      <Navigation 
        activePage={activePage} 
        setActivePage={setActivePage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <div className="flex-1 relative w-full overflow-hidden">
        {activePage === 'home' ? <ParallaxView /> : <StandardPage />}
      </div>

      <style>{`
        html, body, #root {
          height: 100%;
          width: 100vw;
          margin: 0;
          padding: 0;
          overflow: hidden; /* Prevent body scroll, let React handle it */
        }

        /* Hide scrollbar for Chrome/Safari/Opera */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(51, 65, 85, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.8);
        }
      `}</style>
    </div>
  );
}
