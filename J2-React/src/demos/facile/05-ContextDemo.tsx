import { createContext, useContext, useState, type ReactNode } from 'react';

type Role = 'participant' | 'organizer';
type AuthContextType = { user: string | null; role: Role; login: (name: string, role: Role) => void };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<Role>('participant');
  const login = (name: string, r: Role) => {
    setUser(name);
    setRole(r);
  };
  // React 19 : <AuthContext value=...> (l'ancien <AuthContext.Provider> marche encore)
  return <AuthContext value={{ user, role, login }}>{children}</AuthContext>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans <AuthProvider>');
  return context;
}

// Deux composants FRÈRES, aucune prop passée entre eux.
function Navbar() {
  const { user, role } = useAuth();
  return <nav className="badge">{user ? `Connecté : ${user} (${role})` : 'Non connecté'}</nav>;
}

function LoginButtons() {
  const { login } = useAuth();
  return (
    <div className="row">
      <button onClick={() => login('Alice', 'participant')}>Alice (participante)</button>
      <button onClick={() => login('Olivier', 'organizer')}>Olivier (organisateur)</button>
    </div>
  );
}

export function ContextDemo() {
  return (
    <AuthProvider>
      <Navbar />
      <LoginButtons />
    </AuthProvider>
  );
}
