import { X, Layers, Home, Info, Menu } from 'lucide-react';
import theme from '../theme';

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage, isMobileMenuOpen, setIsMobileMenuOpen }) => (
  <nav className={`fixed top-0 left-0 w-full h-16 ${theme.colors.bgNav} backdrop-blur-md border-b ${theme.colors.borderSubtle} z-50 flex items-center justify-between px-6 transition-all duration-300`}>
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
    </div>

    {/* Mobile Toggle */}
    <button 
      className={`md:hidden ${theme.colors.Secondary} hover:${theme.colors.textPrimary}`}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      {isMobileMenuOpen ? <X /> : <Menu />}
    </button>

    {/* Mobile Menu Dropdown */}
    {isMobileMenuOpen && (
      <div className={`absolute top-16 left-0 w-full ${theme.colors.bgMobileMenu} border-b ${theme.colors.borderSubtle} p-4 flex flex-col gap-4 md:hidden`}>
        <button 
          onClick={() => { setActivePage('home'); setIsMobileMenuOpen(false); }}
          className={`flex items-center gap-2 p-2 rounded-lg ${activePage === 'home' ?  theme.colors.accentPrimary : theme.colors.textMuted}`}
        >
          <Home className="w-5 h-5" />
          Immersive View
        </button>
        <button 
          onClick={() => { setActivePage('about'); setIsMobileMenuOpen(false); }}
          className={`flex items-center gap-2 p-2 rounded-lg ${activePage === 'about' ?  theme.colors.accentPrimary : theme.colors.textMuted}`}
        >
          <Info className="w-5 h-5" />
          About Page
        </button>
      </div>
    )}
  </nav>
);

export default Navigation;
