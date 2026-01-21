// theme.ts
export type ThemeType = typeof tokyoDay;

// --- 1. TOKYO NIGHT DAY ---
export const tokyoDay = {
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

// --- 2. TOKYO NIGHT DARK ---
export const tokyoDark: ThemeType = {
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

// --- 3. GRUVBOX LIGHT ---
export const gruvboxLight: ThemeType = {
  colors: {
    bgMain: "bg-[#fbf1c7]",
    bgStandard: "bg-[#ebdbb2]",
    bgNav: "bg-[#fbf1c7]/90",
    bgMobileMenu: "bg-[#ebdbb2]",
    bgCard: "bg-[#ebdbb2]/60",

    textPrimary: "text-[#3c3836]",
    textSecondary: "text-[#504945]",
    textMuted: "text-[#7c6f64]",
    textHighlight: "text-[#b57614]",
    textDark: "text-[#282828]",

    accentPrimary: "text-[#79740e]",   // Gruvbox Green
    accentSecondary: "text-[#076678]", // Gruvbox Blue
    accentTertiary: "text-[#8f3f71]",  // Gruvbox Purple

    borderSubtle: "border-[#d5c4a1]",

    gradientMain: "bg-gradient-to-b from-[#fbf1c7] via-[#ebdbb2] to-[#d5c4a1]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#79740e] to-[#076678]",
  },
  hex: {
    bgMain: "#fbf1c7",
    bgStandard: "#ebdbb2",
    textPrimary: "#3c3836",
    textSecondary: "#504945",
    textHighlight: "#b57614",
    accentPrimary: "#79740e",
    accentSecondary: "#076678",
    accentTertiary: "#8f3f71",
    borderSubtle: "#d5c4a1",
  },
  shapes: {
    primary: "bg-[#79740e]/10 border-[#79740e]/30",
    secondary: "bg-[#076678]/10 bg-[#076678]/20",
    tertiary: "bg-[#8f3f71]/10 border-[#8f3f71]/30",
  },
  badges: {
    primary: "bg-[#79740e]/10 text-[#79740e] border-[#79740e]/20",
    iconContainerPrimary: "bg-[#79740e]/20 text-[#79740e]",
    iconContainerSecondary: "bg-[#076678]/20 text-[#076678]",
    iconContainerTertiary: "bg-[#8f3f71]/20 text-[#8f3f71]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#79740e]/50",
    hoverTertiary: "hover:border-[#8f3f71]/50",
  }
};

// --- 4. GRUVBOX DARK ---
export const gruvboxDark: ThemeType = {
  colors: {
    bgMain: "bg-[#282828]",
    bgStandard: "bg-[#32302f]",
    bgNav: "bg-[#282828]/90",
    bgMobileMenu: "bg-[#32302f]",
    bgCard: "bg-[#32302f]/60",

    textPrimary: "text-[#ebdbb2]",
    textSecondary: "text-[#d5c4a1]",
    textMuted: "text-[#928374]",
    textHighlight: "text-[#d79921]", // Gruvbox Yellow
    textDark: "text-[#1d2021]",

    accentPrimary: "text-[#98971a]",   // Bright Green
    accentSecondary: "text-[#458588]", // Bright Blue
    accentTertiary: "text-[#b16286]",  // Bright Purple

    borderSubtle: "border-[#504945]",

    gradientMain: "bg-gradient-to-b from-[#282828] via-[#32302f] to-[#504945]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#98971a] to-[#458588]",
  },
  hex: {
    bgMain: "#282828",
    bgStandard: "#32302f",
    textPrimary: "#ebdbb2",
    textSecondary: "#d5c4a1",
    textHighlight: "#d79921",
    accentPrimary: "#98971a",
    accentSecondary: "#458588",
    accentTertiary: "#b16286",
    borderSubtle: "#504945",
  },
  shapes: {
    primary: "bg-[#98971a]/10 border-[#98971a]/30",
    secondary: "bg-[#458588]/10 bg-[#458588]/20",
    tertiary: "bg-[#b16286]/10 border-[#b16286]/30",
  },
  badges: {
    primary: "bg-[#98971a]/10 text-[#98971a] border-[#98971a]/20",
    iconContainerPrimary: "bg-[#98971a]/20 text-[#98971a]",
    iconContainerSecondary: "bg-[#458588]/20 text-[#458588]",
    iconContainerTertiary: "bg-[#b16286]/20 text-[#b16286]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#98971a]/50",
    hoverTertiary: "hover:border-[#b16286]/50",
  }
};

export default tokyoDark;
