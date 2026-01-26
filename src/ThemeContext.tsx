// @ts-ignore
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  tokyoDay, 
  tokyoDark, 
  gruvboxLight, 
  gruvboxDark, 
  type ThemeType 
} from './theme';

export type ThemeKey = 'tokyo-day' | 'tokyo-dark' | 'gruvbox-light' | 'gruvbox-dark';

const themes: Record<ThemeKey, ThemeType> = {
  'tokyo-day': tokyoDay,
  'tokyo-dark': tokyoDark,
  'gruvbox-light': gruvboxLight,
  'gruvbox-dark': gruvboxDark,
};

// 1. Define the counterparts
const themeCounterparts: Record<ThemeKey, ThemeKey> = {
  'tokyo-day': 'tokyo-dark',
  'tokyo-dark': 'tokyo-day',
  'gruvbox-light': 'gruvbox-dark',
  'gruvbox-dark': 'gruvbox-light',
};

interface ThemeContextType {
  theme: ThemeType;
  themeKey: ThemeKey;
  setTheme: (key: ThemeKey) => void;
  toggleTheme: () => void; 
  isDarkMode: boolean; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('gruvbox-dark'); // default theme

  const setTheme = (key: ThemeKey) => {
    setThemeKey(key);
  };

  // 2. Implement the toggle logic
  const toggleTheme = () => {
    setThemeKey((prevKey) => themeCounterparts[prevKey]);
  };

  const theme = themes[themeKey];
  
  const isDarkMode = themeKey.includes('dark');

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setTheme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

