// theme.tsx

// 1. Define the Shape of your theme for TypeScript safety
export type ThemeType = typeof lightTheme;

// 2. Your Existing Light Theme (Gruvbox Light)
export const lightTheme = {
  colors: {
    bgMain: "bg-[#fbf1c7]",
    bgStandard: "bg-[#ebdbb2]",
    bgNav: "bg-[#fbf1c7]/90",
    bgMobileMenu: "bg-[#ebdbb2]",
    bgCard: "bg-[#f2e5bc]/50",
    
    textPrimary: "text-[#282828]",
    textSecondary: "text-[#504945]",
    textMuted: "text-[#7c6f64]",
    textHighlight: "text-[#3c3836]", 
    textDark: "text-[#d5c4a1]",
    
    accentPrimary: "text-[#79740e]",
    accentSecondary: "text-[#076678]",
    accentTertiary: "text-[#8f3f71]",
    
    borderSubtle: "border-[#d5c4a1]",
    
    gradientMain: "bg-gradient-to-b from-[#fbf1c7] via-[#ebdbb2] to-[#d5c4a1]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#79740e] to-[#076678]",
  },
  shapes: {
    primary: "bg-[#98971a]/10 border-[#98971a]/30",
    secondary: "bg-[#458588]/10 bg-[#458588]/20",
    tertiary: "bg-[#b16286]/10 border-[#b16286]/30",
  },
  badges: {
    primary: "bg-[#98971a]/10 text-[#79740e] border-[#98971a]/20",
    iconContainerPrimary: "bg-[#98971a]/20 text-[#79740e]",
    iconContainerSecondary: "bg-[#458588]/20 text-[#076678]",
    iconContainerTertiary: "bg-[#b16286]/20 text-[#8f3f71]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#98971a]/50",
    hoverTertiary: "hover:border-[#b16286]/50",
  }
};

// 3. The New Dark Theme (Gruvbox Dark Mappings)
export const darkTheme: ThemeType = {
  colors: {
    bgMain: "bg-[#282828]", // Hard Dark
    bgStandard: "bg-[#3c3836]", // Soft Dark
    bgNav: "bg-[#282828]/90",
    bgMobileMenu: "bg-[#3c3836]",
    bgCard: "bg-[#3c3836]/50",
    
    textPrimary: "text-[#ebdbb2]", // Light Cream
    textSecondary: "text-[#a89984]", // Greyish
    textMuted: "text-[#928374]",
    textHighlight: "text-[#d5c4a1]",
    textDark: "text-[#504945]", 
    
    accentPrimary: "text-[#b8bb26]", // Bright Green
    accentSecondary: "text-[#83a598]", // Bright Blue
    accentTertiary: "text-[#d3869b]", // Bright Purple
    
    borderSubtle: "border-[#504945]",
    
    gradientMain: "bg-gradient-to-b from-[#282828] via-[#3c3836] to-[#504945]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#b8bb26] to-[#83a598]",
  },
  shapes: {
    primary: "bg-[#b8bb26]/10 border-[#b8bb26]/30",
    secondary: "bg-[#83a598]/10 bg-[#83a598]/20",
    tertiary: "bg-[#d3869b]/10 border-[#d3869b]/30",
  },
  badges: {
    primary: "bg-[#b8bb26]/10 text-[#b8bb26] border-[#b8bb26]/20",
    iconContainerPrimary: "bg-[#b8bb26]/20 text-[#b8bb26]",
    iconContainerSecondary: "bg-[#83a598]/20 text-[#83a598]",
    iconContainerTertiary: "bg-[#d3869b]/20 text-[#d3869b]",
  },
  cards: {
    base: "backdrop-blur-md p-8 rounded-2xl border transition-colors shadow-sm",
    hoverPrimary: "hover:border-[#b8bb26]/50",
    hoverTertiary: "hover:border-[#d3869b]/50",
  }
};

export default darkTheme;
