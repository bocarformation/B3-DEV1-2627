// STARTER : l'affichage est prêt, mais rien n'est branché.
// Créez vos fichiers dans ce dossier (useCart.ts, cart-context.ts, CartProvider.tsx, useCartContext.ts).
import { TICKETS, type Ticket } from '../tickets';
import { CartProvider } from './CartProvider';
import { useCartContext } from './useCartContext';

export function CartPage() {
  // TODO étape 3 : tout envelopper dans <CartProvider>
  return (
    <CartProvider>
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
    </CartProvider>
  );
}

function CartBadge() {
  // const totalTickets = 0; // TODO : depuis le panier
  // const totalPrice = 0; // TODO : depuis le panier

  const {totalTickets, totalPrice} = useCartContext();
  return (
    <span className="badge">
      Panier : {totalTickets} billet(s) - {totalPrice} €
    </span>
  );
}

function TicketCard({ ticket }: { ticket: Ticket }) {
  // const quantity = 0; // TODO : quantité de ce billet dans le panier

  const {quantityOf, add, remove} = useCartContext();
  const quantity = quantityOf(ticket.id);
  return (
    <li className="card">
      <div>
        <strong>{ticket.title}</strong>
        <div className="muted">
          {ticket.price} € · {ticket.remaining} place(s) restante(s)
        </div>
      </div>
      <div className="row">
        <button disabled={quantity === 0} onClick={() => remove(ticket.id)}>-</button>
        <span>{quantity}</span>
        <button disabled={quantity >= ticket.remaining} onClick={() => add(ticket)}>+</button>
      </div>
    </li>
  );
}

function CartSummary() {
  // const lines: CartLine[] = []; // TODO : depuis le panier

  const {lines, totalPrice, clear} = useCartContext(); 
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
      <p>
        <strong>Total: {totalPrice} €</strong>
      </p>
            <button onClick={() => clear()}>Vider le panier</button>
    </div>
  );
}
