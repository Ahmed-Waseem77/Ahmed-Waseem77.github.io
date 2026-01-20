import theme from '../theme';
import { useTheme } from '../ThemeContext'; 

const StandardPage: React.FC = () => {
  const { theme, toggleTheme, isDarkMode } = useTheme();
  return (
  <div className={`w-full min-h-full ${theme.colors.bgStandard} overflow-y-auto pt-20`}>
    <div className="container mx-auto px-6 max-w-2xl pb-20">
      <h1 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-6`}>About Page</h1>
      <div className="prose prose-invert prose-lg">
        <p className={theme.colors.textSecondary}>
          This is a normal page without the parallax scroll container. It demonstrates that the routing logic correctly switches between the complex scroll-listener view and a standard semantic HTML document flow.
        </p>
        <hr className={`${theme.colors.borderSubtle} my-8`} />
        <p className={theme.colors.textSecondary}>
          In a real application, you might use this layout for settings, detailed articles, or forms where parallax effects might be distracting or accessibility concerns take priority.
        </p>
        <div className={`mt-8 p-4 ${theme.colors.bgMobileMenu} rounded-lg border ${theme.colors.borderSubtle}`}>
          <h3 className={`${theme.colors.textPrimary} font-medium mb-2`}>Technical Note</h3>
          <p className={`text-sm ${theme.colors.textMuted}`}>
            The parallax effect is destroyed when navigating here and re-initialized when returning to Home, ensuring no lingering scroll listeners cause memory leaks.
          </p>
        </div>
      </div>
    </div>
  </div>
);
}

export default StandardPage;
