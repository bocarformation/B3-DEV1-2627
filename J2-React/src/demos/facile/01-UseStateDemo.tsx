import { useState } from 'react';

export function UseStateDemo() {

  const [email, setEmail] = useState('');
  const [seats, setSeats] = useState(1);
  const [sent, setSent] = useState<string | null>(null);

  // PIÈGE : seats est une "photo" du rendu en cours. 3 appels = 3 fois "1 + 1".
  const addThreeBug = () => {
    setSeats(seats + 1); // 1 + 1
    setSeats(seats + 1); // 1 + 1
    setSeats(seats + 1); // 1 + 1 => 2

    // seats = get donc lecteur seul
  };
  // CORRECT : la forme "updater" reçoit la valeur la plus récente.
  const addThreeOk = () => {
    setSeats((s) => s + 1); // 1+1
    setSeats((s) => s + 1); // 2+1
    setSeats((s) => s + 1); // 3+1 => on passe de 1 à 4

    // setSeats(prev => prev + 1);
  };


  console.log('rendu UseStateDemo', { email, seats });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // sinon le navigateur recharge la page
        setSent(`${seats} place(s) pour ${email}`);
      }}
    >
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Adresse email" />
      <p>Places : {seats}</p>
      <div className="row">
        <button type="button" onClick={addThreeBug}>+3 (bug)</button>
        <button type="button" onClick={addThreeOk}>+3 (updater)</button>
        <button type="button" onClick={() => setSeats(1)}>Remettre à 1</button>
        <button type="submit">Réserver</button>
      </div>
      {sent && <p className="ok">Envoyé : {sent}</p>}
    </form>
  );
}
