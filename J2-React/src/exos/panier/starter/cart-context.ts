import { createContext } from "react";
import type { useCart } from "./useCart";

export type CartContextValue = ReturnType<typeof useCart>

export const CartContext = createContext<CartContextValue | undefined>(undefined);
