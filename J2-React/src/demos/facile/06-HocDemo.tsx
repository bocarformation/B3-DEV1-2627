import { useEffect, useState, type ComponentType } from 'react';

function UserProfile({ username }: { username: string }) {
  return <p>Bienvenue, {username} !</p>;
}

// HOC = fonction qui prend un composant et RENVOIE un nouveau composant.
function withLoading<P extends object>(Wrapped: ComponentType<P>) {
  function WithLoading({ loading, ...props }: P & { loading: boolean }) {
    if (loading) return <p>Chargement en cours...</p>;
    return <Wrapped {...(props as P)} />;
  }
  WithLoading.displayName = `withLoading(${Wrapped.displayName ?? Wrapped.name})`; // pour React DevTools
  return WithLoading;
}

// Créé UNE fois, hors du composant (sinon nouveau composant à chaque rendu -> état perdu).
const UserProfileWithLoading = withLoading(UserProfile);

export function HocDemo() {
  const [loading, setLoading] = useState(true);
  const [user] = useState('Alice');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <UserProfileWithLoading loading={loading} username={user} />
      <button onClick={() => setLoading((l) => !l)}>Basculer loading</button>
    </div>
  );
}
