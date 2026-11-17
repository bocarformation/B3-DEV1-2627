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
    case 'cart/added':
      // TODO
      return state;
    case 'cart/removed':
      // TODO
      return state;
    case 'cart/cleared':
      // TODO
      return state;
  }
}
