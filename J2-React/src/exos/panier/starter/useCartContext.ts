import { useContext } from "react";
import { CartContext } from "./cart-context";

export function useCartContext(){
    const context = useContext(CartContext);
    if(!context) {
        throw new Error("useCartContext doit être utilisé dans le <CartProvider>");
    }

    return context;
}
// npm run lint 