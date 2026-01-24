import theme from '../theme';
import { useTheme } from '../ThemeContext'; 

const StandardPage: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  return (
  <div className={`w-full min-h-full ${theme.colors.bgMain} overflow-y-auto pt-20 mt-10 mb`}>
    <div className="container mx-auto px-6 max-w-2xl pb-20">
      <h1 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-6`}>About Page</h1>
      <div className="prose prose-invert prose-lg">
        <p className={theme.colors.textSecondary}>
This open source project intentionally employs a multimodal format by combining written
interpretation, visual material, spatial organization, and chronological
navigation. Images are used not merely for illustration but as primary evidence,
supported by concise analytical text explaining form, symbolism, and function.
The website structure allows non-linear navigation, enabling users to explore
sites independently, similar to a real visit, while still maintaining historical and
thematic coherence.        </p>
        <hr className={`${theme.colors.borderSubtle} my-8`} />
        <div className={`mt-8 p-4 ${theme.colors.bgStandard} rounded-lg border ${theme.colors.borderSubtle}`}>
          <h3 className={`${theme.colors.textPrimary} font-medium mb-2`}>Limitations & Challenges</h3>
          <p className={`text-sm ${theme.colors.textSecondary}`}>
A primary limitation of this project is that a digital platform cannot fully
replicate the scale, atmosphere, and spatial experience of monumental
architecture. Additionally, interpretations rely on existing archaeological and
scholarly sources, which may reflect ongoing academic debates or incomplete
evidence. These challenges were addressed by consulting multiple authoritative
sources and focusing on widely supported interpretations rather than definitive
or speculative claims.          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default StandardPage;
