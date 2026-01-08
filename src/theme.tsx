export const theme = {
  colors: {
    // Semantic Backgrounds
    // Gruvbox Light BG: Creamy white (#fbf1c7) to Beige (#ebdbb2)
    bgMain: "bg-[#fbf1c7]",
    bgStandard: "bg-[#ebdbb2]",
    bgNav: "bg-[#fbf1c7]/90",
    bgMobileMenu: "bg-[#ebdbb2]",
    bgCard: "bg-[#f2e5bc]/50", // Soft cream for cards
    
    // Semantic Text
    // Primary text is now very dark charcoal (#282828) for contrast
    textPrimary: "text-[#282828]",
    textSecondary: "text-[#504945]", // Darker grey-brown
    textMuted: "text-[#7c6f64]", // Muted earth tone
    textHighlight: "text-[#3c3836]", 
    textDark: "text-[#d5c4a1]", // For "massive" watermark text (low contrast against light bg)
    
    // Accents 
    // Mapped: Emerald -> Green, Blue -> Blue, Purple -> Purple
    // We use the "Dark" variants of Gruvbox colors for text readability on light backgrounds
    accentPrimary: "text-[#79740e]", // Gruvbox Dark Green
    accentSecondary: "text-[#076678]", // Gruvbox Dark Blue
    accentTertiary: "text-[#8f3f71]", // Gruvbox Dark Purple
    
    // Borders
    borderSubtle: "border-[#d5c4a1]", // Dark beige border
    
    // Special Effects / Gradients
    // Gradient goes from Light Cream -> Darker Beige
    gradientMain: "bg-gradient-to-b from-[#fbf1c7] via-[#ebdbb2] to-[#d5c4a1]",
    textGradient: "text-transparent bg-clip-text bg-gradient-to-r from-[#79740e] to-[#076678]",
  },
  
  // Specific styling groupings
  shapes: {
    primary: "bg-[#98971a]/10 border-[#98971a]/30", // Green
    secondary: "bg-[#458588]/10 bg-[#458588]/20",    // Blue
    tertiary: "bg-[#b16286]/10 border-[#b16286]/30",  // Purple
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

export default theme; theme;
