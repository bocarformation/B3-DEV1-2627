import { Component, type ReactNode } from 'react';

// Le SEUL composant classe du projet : en React 19, un "error boundary" s'écrit encore en classe.
// Il affiche l'erreur d'une démo (ex. Context sans Provider) au lieu d'une page blanche.
type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-box">
          <strong>Erreur attrapée par l'ErrorBoundary :</strong>
          <pre>{this.state.error.message}</pre>
          <button onClick={() => this.setState({ error: null })}>Réessayer</button>
        </div>
      );
    }
    return this.props.children;
  }
}
