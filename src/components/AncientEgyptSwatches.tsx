import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Palette, Check, Copy, X } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const ancientEgyptPalette = {
  'fiery-terracotta': { 50: '#fbedea', 100: '#f6dbd5', 200: '#eeb7aa', 300: '#e59380', 400: '#dc6e56', 500: '#d44a2b', 600: '#a93b23', 700: '#7f2d1a', 800: '#551e11', 900: '#2a0f09', 950: '#1e0a06' },
  'reddish-brown': { 50: '#faeeea', 100: '#f5ded6', 200: '#ebbcad', 300: '#e19b84', 400: '#d77a5b', 500: '#cd5932', 600: '#a44728', 700: '#7b351e', 800: '#522314', 900: '#29120a', 950: '#1d0c07' },
  'ocean-mist': { 50: '#edf7f5', 100: '#dbf0ec', 200: '#b8e0d9', 300: '#94d1c6', 400: '#70c2b3', 500: '#4db3a0', 600: '#3d8f80', 700: '#2e6b60', 800: '#1f4740', 900: '#0f2420', 950: '#0b1916' },
  'pine-blue': { 50: '#eef6f7', 100: '#ddedee', 200: '#badade', 300: '#98c8cd', 400: '#75b6bd', 500: '#53a3ac', 600: '#42838a', 700: '#326267', 800: '#214145', 900: '#112122', 950: '#0c1718' },
  'dark-slate-grey': { 50: '#edf7f7', 100: '#dbf0f0', 200: '#b8e0e0', 300: '#94d1d1', 400: '#70c2c2', 500: '#4db2b3', 600: '#3d8f8f', 700: '#2e6b6b', 800: '#1f4747', 900: '#0f2424', 950: '#0b1919' },
  'royal-gold': { 50: '#fcf8e8', 100: '#faf2d1', 200: '#f4e4a4', 300: '#efd776', 400: '#eac948', 500: '#e4bc1b', 600: '#b79615', 700: '#897110', 800: '#5b4b0b', 900: '#2e2605', 950: '#201a04' },
  'malachite': { 50: '#e9fcef', 100: '#d3f8df', 200: '#a7f1c0', 300: '#7beaa0', 400: '#4fe380', 500: '#22dd60', 600: '#1cb04d', 700: '#15843a', 800: '#0e5827', 900: '#072c13', 950: '#051f0e' },
  'shamrock': { 50: '#ecf8f1', 100: '#d9f2e3', 200: '#b4e4c6', 300: '#8ed7aa', 400: '#68ca8e', 500: '#42bd71', 600: '#35975b', 700: '#287144', 800: '#1b4b2d', 900: '#0d2617', 950: '#091a10' },
  'hunter-green': { 50: '#edf7f3', 100: '#dbf0e6', 200: '#b7e1cd', 300: '#93d2b5', 400: '#6fc39c', 500: '#4bb483', 600: '#3c9069', 700: '#2d6c4f', 800: '#1e4834', 900: '#0f241a', 950: '#0b1912' },
  'parchment': { 50: '#f5f1f0', 100: '#eae4e1', 200: '#d6c9c2', 300: '#c1aea4', 400: '#ac9386', 500: '#987767', 600: '#796053', 700: '#5b483e', 800: '#3d3029', 900: '#1e1815', 950: '#15110e' },
};

const allowedShades = ['300', '400', '500', '600', '700'];

const AncientEgyptSwatches: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  
  // Controls mounting for Portal
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-full transition-colors ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} hover:bg-black/5`}
        title="View Ancient Egypt Palette"
      >
        <Palette className="w-5 h-5" />
      </button>

      {/* 1. Removed `isOpen &&` check. The Portal is ALWAYS rendered if mounted.
          2. We control visibility via CSS classes inside.
      */}
      {mounted && createPortal(
        <div 
          className={`fixed inset-0 z-[9999] flex justify-end transition-all duration-300 ${
            isOpen ? 'pointer-events-auto' : 'pointer-events-none delay-300'
          }`}
        >
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 bg-black/30 backdrop-blur-md transition-opacity duration-300 ease-in-out ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`} 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Sliding Drawer Panel */}
          <div 
            className={`relative h-full w-[420px] shadow-2xl border-l ${theme.colors.borderSubtle} ${theme.colors.bgMain} transition-transform duration-300 ease-out transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className={`flex justify-between h-16 items-center p-6 border-b ${theme.colors.borderSubtle}`}>
                <h3 className={`font-bold text-lg ${theme.colors.textPrimary}`}>Ancient Egypt Palette</h3>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className={`p-1 rounded-full hover:bg-black/10 ${theme.colors.textSecondary}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {Object.entries(ancientEgyptPalette).map(([name, shades]) => (
                  <div key={name} className="flex items-center justify-between group">
                    <p className={`text-sm font-semibold capitalize w-32 ${theme.colors.textSecondary}`}>
                      {name.replace(/-/g, ' ')}
                    </p>

                    <div className="flex gap-2">
                      {Object.entries(shades)
                        .filter(([shade]) => allowedShades.includes(shade))
                        .map(([shade, hex]) => (
                          <div
                            key={shade}
                            className="group/swatch relative w-8 h-8 rounded cursor-pointer transition-transform hover:scale-110 hover:z-10 shadow-sm border border-black/5"
                            style={{ backgroundColor: hex }}
                            onClick={() => handleCopy(hex)}
                            title={`${name}-${shade}: ${hex}`}
                          >
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/swatch:opacity-100 bg-black/20 rounded transition-opacity">
                               {copiedHex === hex ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-white" />}
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className={`p-4 border-t ${theme.colors.borderSubtle} text-center bg-inherit`}>
                {copiedHex ? (
                  <span className="text-sm font-medium text-emerald-500 animate-pulse">Copied {copiedHex}!</span>
                ) : (
                  <span className={`text-xs ${theme.colors.textMuted}`}>Click a color to copy HEX</span>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default AncientEgyptSwatches;
