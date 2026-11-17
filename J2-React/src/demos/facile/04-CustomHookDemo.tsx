import { useState } from 'react';

type Theme = 'light' | 'dark';

function useThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>('light');
  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  return { theme, toggleTheme, isDark: theme === 'dark' };
}

// Le composant ne fait plus qu'afficher : la logique est dans le hook ("presenter").
function ThemeSelector({ label }: { label: string }) {
  const presenter = useThemeSwitcher();
  return (
    <div
      className="panel"
      style={{ background: presenter.isDark ? '#333' : '#eee', color: presenter.isDark ? '#fff' : '#000' }}
    >
      <p>
        {label} : thème {presenter.theme.toUpperCase()}
      </p>
      <button onClick={presenter.toggleTheme}>Changer de thème</button>
    </div>
  );
}

export function CustomHookDemo() {
  return (
    <div className="row">
      <ThemeSelector label="Bloc A" />
      <ThemeSelector label="Bloc B" />
      <p className="hint">
        Cliquez sur A : B ne change pas. Un custom hook partage de la LOGIQUE, pas de l'ÉTAT
        (chaque appel a son propre useState). Pour partager l'état : Context (démo suivante).
      </p>
    </div>
  );
}
