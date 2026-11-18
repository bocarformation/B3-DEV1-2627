import type { ReactNode } from "react";
import { CartContext } from "./cart-context";
import { useCart } from "./useCart";

export function CartProvider({children}: {children: ReactNode}) {
    const cart = useCart(); // appelé une seule fois: UN SEUL PANIER PARTAGE entre les composants

    return <CartContext value={cart}>{children}</CartContext>;
    
}
