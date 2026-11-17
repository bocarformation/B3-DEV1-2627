import { useEffect, useState } from 'react';

// Compte à rebours avant l'ouverture de la billetterie.
function Countdown() {
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    console.log('[effet] je démarre le timer');
    const id = setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    // CLEANUP : appelé au démontage (et avant chaque ré-exécution de l'effet).
    // Commentez ces 4 lignes : en dev, 2 timers tournent -> le compte descend de 2 en 2.
    return () => {
      console.log('[cleanup] j’arrête le timer');
      clearInterval(id);
    };
  }, []); // [] = une fois au montage. Sans tableau = après CHAQUE rendu.

  return <p className="big">Ouverture de la billetterie dans {seconds} s</p>;
}

export function UseEffectDemo() {
  const [visible, setVisible] = useState(true);
  return (
    <div>
      <button onClick={() => setVisible((v) => !v)}>
        {visible ? 'Démonter' : 'Monter'} le compte à rebours
      </button>
      {visible && <Countdown />}
      <p className="hint">
        Console (F12) au chargement : <code>[effet]</code>, <code>[cleanup]</code>, <code>[effet]</code>.
        C'est  StrictMode (dans main.tsx) : en DEV, React monte, démonte puis remonte chaque
        composant pour vérifier que votre cleanup est correct. En production : un seul appel.
      </p>
    </div>
  );
}
