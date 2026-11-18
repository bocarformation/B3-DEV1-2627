import type { Ticket } from '../tickets';

export type CartLine = { ticketId: string; title: string; unitPrice: number; quantity: number };
export type CartState = { lines: CartLine[] };

export type CartAction =
  | { type: 'cart/added'; ticket: Ticket }
  | { type: 'cart/removed'; ticketId: string }
  | { type: 'cart/cleared' };

export const initialCartState: CartState = { lines: [] };

// ÉTAPE 1 : complétez ce reducer. Règles dans ENONCE.md.
// Rappel : fonction PURE, on renvoie un NOUVEL objet, on ne modifie jamais `state`.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'cart/added': {
      const { ticket } = action;
      const line = state.lines.find(l => l.ticketId === ticket.id);
      const current = line?.quantity ?? 0;

      if (current >= ticket.remaining) {
        return state;
      }

      if (!line) {
        const newLine: CartLine = { ticketId: ticket.id, title: ticket.title, unitPrice: ticket.price, quantity: 1 };

        return { lines: [...state.lines, newLine] };
      }
      return {
        lines: state.lines.map(l => (l.ticketId === ticket.id ? { ...l, quantity: l.quantity + 1 } : l)),
      }
    }
    case 'cart/removed': {
      const line = state.lines.find(l => l.ticketId === action.ticketId);
      if(!line) return state;
      if(line.quantity === 1) return { lines: state.lines.filter(l => l.ticketId !== action.ticketId)};
      return {
        lines: state.lines.map(l => (l.ticketId === action.ticketId ? {...l, quantity: l.quantity - 1} : l))
      }
    }
    case 'cart/cleared':
      return initialCartState;
  }
}
