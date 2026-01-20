import { X, Layers, Home, Info, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext'; 

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  // 1. Get the dynamic theme object and toggle function
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 w-full h-16 ${theme.colors.bgNav} backdrop-blur-md border-b ${theme.colors.borderSubtle} z-50 flex items-center justify-between px-6 transition-all duration-300`}>
      
      {/* Brand */}
      <div className={`flex items-center gap-2 ${theme.colors.accentPrimary} font-bold text-xl tracking-tighter cursor-pointer`} onClick={() => setActivePage('home')}>
        <Layers className="w-6 h-6" />
        <span>AL<span className={theme.colors.textPrimary}> ARD</span></span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setActivePage('home')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activePage === 'home' ? theme.colors.accentPrimary : `${theme.colors.textSecondary} hover:${theme.colors.textPrimary}`}`}
        >
          <Home className="w-4 h-4" />
          Immersive View
        </button>
        <button 
          onClick={() => setActivePage('about')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activePage === 'about' ? theme.colors.accentPrimary : `${theme.colors.textSecondary} hover:${theme.colors.textPrimary}`}`}
        >
          <Info className="w-4 h-4" />
          About Page
        </button>

        {/* --- 2. DARK MODE TOGGLE BUTTON --- */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} hover:bg-black/5`}
          title="Toggle Theme"
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Toggle */}
      <div className="flex items-center gap-4 md:hidden">
        {/* Mobile Dark Mode Toggle */}
        <button onClick={toggleTheme} className={theme.colors.textSecondary}>
           {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <button 
          className={`${theme.colors.textSecondary} hover:${theme.colors.textPrimary}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`absolute top-16 left-0 w-full ${theme.colors.bgMobileMenu} border-b ${theme.colors.borderSubtle} p-4 flex flex-col gap-4 md:hidden`}>
           {/* Mobile menu items here... (same as before) */}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
