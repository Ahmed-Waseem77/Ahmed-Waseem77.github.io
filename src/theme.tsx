export type ThemeType = typeof lightTheme;

// 1. Tokyo Night Day (Light)
export const lightTheme = {
  colors: {
    bgMain: "bg-[#e1e2e7]",       
    bgStandard: "bg-[#d0d5d9]",   
    bgNav: "bg-[#e1e2e7]/90",
    bgMobileMenu: "bg-[#d0d5d9]",
    bgCard: "bg-[#d0d5d9]/50",
    
    textPrimary: "text-[#3760bf]",   
    textSecondary: "text-[#6172b0]", 
    textMuted: "text-[#848cb5]",     
    textHighlight: "text-[#2e7de9]", 
    textDark: "text-[#16161e]",      
    
    accentPrimary: "text-[#587539]",   
    accentSecondary: "text-[#007197]", 
    accentTertiary: "text-[#9854f1]",  
    
    borderSubtle: "border-[#a8aecb]",
    
    gradientMain: "bg-gradient-to-b from-[#e1e2e7] via-[#d0d5d9] to-[#a8aecb]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#587539] to-[#007197]",
  },
  // NEW: Raw Hex Values for JS Logic (Shadows, Canvas, etc.)
  hex: {
    bgMain: "#e1e2e7",
    bgStandard: "#d0d5d9",
    textPrimary: "#3760bf",
    textSecondary: "#6172b0",
    textHighlight: "#2e7de9",
    accentPrimary: "#587539",
    accentSecondary: "#007197",
    accentTertiary: "#9854f1",
    borderSubtle: "#a8aecb",
  },
  shapes: {
    primary: "bg-[#587539]/10 border-[#587539]/30",
    secondary: "bg-[#007197]/10 bg-[#007197]/20",
    tertiary: "bg-[#9854f1]/10 border-[#9854f1]/30",
  },
  badges: {
    primary: "bg-[#587539]/10 text-[#587539] border-[#587539]/20",
    iconContainerPrimary: "bg-[#587539]/20 text-[#587539]",
    iconContainerSecondary: "bg-[#007197]/20 text-[#007197]",
    iconContainerTertiary: "bg-[#9854f1]/20 text-[#9854f1]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#587539]/50",
    hoverTertiary: "hover:border-[#9854f1]/50",
  }
};

// 2. Tokyo Night (Dark)
export const darkTheme: ThemeType = {
  colors: {
    bgMain: "bg-[#1a1b26]",       
    bgStandard: "bg-[#24283b]",   
    bgNav: "bg-[#1a1b26]/90",
    bgMobileMenu: "bg-[#24283b]",
    bgCard: "bg-[#24283b]/50",
    
    textPrimary: "text-[#c0caf5]",   
    textSecondary: "text-[#a9b1d6]", 
    textMuted: "text-[#565f89]",     
    textHighlight: "text-[#7aa2f7]", 
    textDark: "text-[#414868]",      
    
    accentPrimary: "text-[#9ece6a]",   
    accentSecondary: "text-[#7dcfff]", 
    accentTertiary: "text-[#bb9af7]",  
    
    borderSubtle: "border-[#414868]",
    
    gradientMain: "bg-gradient-to-b from-[#1a1b26] via-[#24283b] to-[#414868]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#9ece6a] to-[#7dcfff]",
  },
  // NEW: Raw Hex Values for JS Logic
  hex: {
    bgMain: "#1a1b26",
    bgStandard: "#24283b",
    textPrimary: "#c0caf5",
    textSecondary: "#a9b1d6",
    textHighlight: "#7aa2f7",
    accentPrimary: "#9ece6a",
    accentSecondary: "#7dcfff",
    accentTertiary: "#bb9af7",
    borderSubtle: "#414868",
  },
  shapes: {
    primary: "bg-[#9ece6a]/10 border-[#9ece6a]/30",
    secondary: "bg-[#7dcfff]/10 bg-[#7dcfff]/20",
    tertiary: "bg-[#bb9af7]/10 border-[#bb9af7]/30",
  },
  badges: {
    primary: "bg-[#9ece6a]/10 text-[#9ece6a] border-[#9ece6a]/20",
    iconContainerPrimary: "bg-[#9ece6a]/20 text-[#9ece6a]",
    iconContainerSecondary: "bg-[#7dcfff]/20 text-[#7dcfff]",
    iconContainerTertiary: "bg-[#bb9af7]/20 text-[#bb9af7]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#9ece6a]/50",
    hoverTertiary: "hover:border-[#bb9af7]/50",
  }
};

export default darkTheme;
