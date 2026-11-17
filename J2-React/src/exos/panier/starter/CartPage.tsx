// STARTER : l'affichage est prêt, mais rien n'est branché.
// Créez vos fichiers dans ce dossier (useCart.ts, cart-context.ts, CartProvider.tsx, useCartContext.ts).
import { TICKETS, type Ticket } from '../tickets';
import type { CartLine } from './cart-reducer';

export function CartPage() {
  // TODO étape 3 : tout envelopper dans <CartProvider>
  return (
    <div>
      <header className="row">
        <h3>Billetterie EventHub</h3>
        <CartBadge />
      </header>
      <ul className="list">
        {TICKETS.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
      </ul>
      <CartSummary />
    </div>
  );
}

function CartBadge() {
  const totalTickets = 0; // TODO : depuis le panier
  const totalPrice = 0; // TODO : depuis le panier
  return (
    <span className="badge">
      Panier : {totalTickets} billet(s) - {totalPrice} €
    </span>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  const quantity = 0; // TODO : quantité de ce billet dans le panier
  return (
    <li className="card">
      <div>
        <strong>{ticket.title}</strong>
        <div className="muted">
          {ticket.price} € · {ticket.remaining} place(s) restante(s)
        </div>
      </div>
      <div className="row">
        <button onClick={() => console.log('TODO retirer', ticket.id)}>-</button>
        <span>{quantity}</span>
        <button onClick={() => console.log('TODO ajouter', ticket.id)}>+</button>
      </div>
    </li>
  );
}

function CartSummary() {
  const lines: CartLine[] = []; // TODO : depuis le panier
  if (lines.length === 0) return <p className="muted">Votre panier est vide.</p>;
  return (
    <div className="panel">
      <ul>
        {lines.map((line) => (
          <li key={line.ticketId}>
            {line.title} x {line.quantity} = {line.unitPrice * line.quantity} €
          </li>
        ))}
      </ul>
      <button onClick={() => console.log('TODO vider')}>Vider le panier</button>
    </div>
  );
}
