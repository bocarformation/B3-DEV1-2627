import { useEffect, useReducer } from "react";
import { cartReducer, initialCartState, type CartState } from "./cart-reducer";
import type { Ticket } from "../tickets";

const STORAGE_KEY = "eventhub-cart";

function loadCart(): CartState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) ) : initialCartState;
    } catch (error) {
        return initialCartState;
    }
}

export function useCart() {
    const[state, dispatch] = useReducer(cartReducer, undefined, loadCart);

    const totalTickets = state.lines.reduce((sum, l) => sum + l.quantity, 0);

    const totalPrice = state.lines.reduce((sum, l) => sum + l.quantity * l.unitPrice, 0)

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state])

    return {
        lines: state.lines,
        totalTickets,
        totalPrice,
        quantityOf: (ticketId: string ) => state.lines.find(l => l.ticketId === ticketId)?.quantity ?? 0,
        add: (ticket: Ticket) => dispatch({type: "cart/added", ticket}),
        remove: (ticketId: string) => dispatch({type:"cart/removed", ticketId}),
        clear: () => dispatch({type: "cart/cleared"})
    }
}