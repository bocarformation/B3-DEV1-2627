import { useReducer } from 'react';

type Ticket = { id: string; name: string; quantity: number };
type Action = { type: 'add'; ticket: Ticket } | { type: 'remove'; id: string } | { type: 'clear' };

// Fonction PURE, hors du composant : testable sans React (comme un slice Redux demain).
function cartReducer(state: Ticket[], action: Action): Ticket[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((t) => t.id === action.ticket.id);
      if (existing) {
        return state.map((t) => (t.id === action.ticket.id ? { ...t, quantity: t.quantity + 1 } : t));
      }
      return [...state, action.ticket];
    }
    case 'remove':
      return state.filter((t) => t.id !== action.id);
    case 'clear':
      return [];
  }
}

export function UseReducerDemo() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const concert = { id: '1', name: 'Concert A', quantity: 1 };
  const meetup = { id: '2', name: 'Meetup React', quantity: 1 };

  return (
    <div>
      <div className="row">
        <button onClick={() => dispatch({ type: 'add', ticket: concert })}>+ Concert A</button>
        <button onClick={() => dispatch({ type: 'add', ticket: meetup })}>+ Meetup React</button>
        <button onClick={() => dispatch({ type: 'clear' })}>Vider le panier</button>
      </div>
      <ul>
        {cart.map((ticket) => (
          <li key={ticket.id}>
            {ticket.name} : {ticket.quantity} billet(s){' '}
            <button onClick={() => dispatch({ type: 'remove', id: ticket.id })}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
