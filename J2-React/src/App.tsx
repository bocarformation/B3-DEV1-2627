import { useEffect, useState, type ComponentType } from 'react';
import { ErrorBoundary } from './shared/ErrorBoundary';
import { UseStateDemo } from './demos/facile/01-UseStateDemo';
import { UseEffectDemo } from './demos/facile/02-UseEffectDemo';
import { UseReducerDemo } from './demos/facile/03-UseReducerDemo';
import { CustomHookDemo } from './demos/facile/04-CustomHookDemo';
import { ContextDemo } from './demos/facile/05-ContextDemo';
import { HocDemo } from './demos/facile/06-HocDemo';
import { EventsPage } from './demos/live/EventsPage';
import { CartPage as ExoStarter } from './exos/panier/starter/CartPage';

type Demo = { id: string; group: string; label: string; file: string; Component: ComponentType };

const DEMOS: Demo[] = [
  { id: 'use-state', group: 'Démos', label: '1. useState', file: 'demos/facile/01-UseStateDemo.tsx', Component: UseStateDemo },
  { id: 'use-effect', group: 'Démos', label: '2. useEffect', file: 'demos/facile/02-UseEffectDemo.tsx', Component: UseEffectDemo },
  { id: 'use-reducer', group: 'Démos', label: '3. useReducer', file: 'demos/facile/03-UseReducerDemo.tsx', Component: UseReducerDemo },
  { id: 'custom-hook', group: 'Démos', label: '4. Custom hook', file: 'demos/facile/04-CustomHookDemo.tsx', Component: CustomHookDemo },
  { id: 'context', group: 'Démos', label: '5. Context', file: 'demos/facile/05-ContextDemo.tsx', Component: ContextDemo },
  { id: 'hoc', group: 'Démos', label: '6. HOC', file: 'demos/facile/06-HocDemo.tsx', Component: HocDemo },
  { id: 'live', group: 'Live : évènements', label: 'EventsPage', file: 'demos/live/', Component: EventsPage },
  { id: 'exo-starter', group: 'Exercice panier', label: 'Starter', file: 'exos/panier/starter/', Component: ExoStarter },
];

// Mini "routeur" par le hash de l'URL (#use-state...). C'est aussi un useEffect avec cleanup !
function useHash() {
  const [hash, setHash] = useState(() => window.location.hash.slice(1));
  useEffect(() => {
    const onChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();
  const current = DEMOS.find((d) => d.id === hash) ?? DEMOS[0];
  const groups = [...new Set(DEMOS.map((d) => d.group))];

  return (
    <div className="layout">
      <nav className="sidebar">
        <h1>J2 React</h1>
        {groups.map((group) => (
          <section key={group}>
            <h2>{group}</h2>
            {DEMOS.filter((d) => d.group === group).map((d) => (
              <a key={d.id} href={`#${d.id}`} className={d.id === current.id ? 'active' : ''}>
                {d.label}
              </a>
            ))}
          </section>
        ))}
      </nav>
      <main className="content">
        <p className="file">src/{current.file}</p>
        {/* key : on change d'onglet = on démonte/remonte la démo et on réinitialise l'ErrorBoundary */}
        <ErrorBoundary key={current.id}>
          <current.Component />
        </ErrorBoundary>
      </main>
    </div>
  );
}
