import { X, Amphora, Home, Info, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext'; 
import FanAlArd from '../assets/FanAlArd';
import AncientEgyptSwatches from './AncientEgyptSwatches';

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  // 1. Get the dynamic theme object and toggle function
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <nav className={`fixed top-0 left-0 w-full h-16 ${theme.colors.bgNav} backdrop-blur-md border-b ${theme.colors.borderSubtle} z-50 flex items-center justify-between px-6 transition-all duration-300`}>
      
      {/* Brand */}
      <div className={`flex items-start gap-2 ${theme.colors.accentTertiary} font-bold text-xl tracking-tighter cursor-pointer`} onClick={() => setActivePage('home')}>
      <span className="inline-flex items-end h-10">
        <FanAlArd 
	className="w-20 h-10" 
	style={{
		color:`${theme.hex.accentPrimary}`
	}} />
        </span>
	{/* <div 
	     className={`ml-4 px-3 dm-mono-medium text-sm`}
	     style={{ backgroundColor: theme.hex.accentPrimary,
	   color: theme.hex.bgMain
	     }}
	   >
	     FAN AL ARD
	   </div> */}
      </div> 

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <button 
          onClick={() => setActivePage('home')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activePage === 'home' ? theme.colors.accentPrimary : `${theme.colors.textSecondary} hover:${theme.colors.textPrimary}`}`}
        >
          <Home className="w-4 h-4" />
          Home 
        </button>
        <button 
          onClick={() => setActivePage('about')}
          className={`flex items-center gap-2 text-sm font-medium transition-colors ${activePage === 'about' ? theme.colors.accentPrimary : `${theme.colors.textSecondary} hover:${theme.colors.textPrimary}`}`}
        >
          <Info className="w-4 h-4" />
          About Page
        </button>

	<AncientEgyptSwatches />
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
