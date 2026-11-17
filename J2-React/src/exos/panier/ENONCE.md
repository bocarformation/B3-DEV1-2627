# Exercice : le panier de billets EventHub (35 min)

**Objectif** : utiliser dans un même petit projet `useReducer`, un custom hook et un Context. C'est la même organisation que demain dans EventHub (reducer → slice Redux, custom hook → presenter, Provider → `<Provider store>`).

## Démarrage (2 min)

```powershell
cd 03-react
npm install      # seulement la première fois
npm run dev
```
Ouvrez l'URL affichée, puis l'onglet **Exercice panier > Starter**. Vous travaillez **uniquement** dans `src/exos/panier/starter/`.

Ce qui est fourni :
- `../tickets.ts` : 4 billets (`id`, `title`, `price`, `remaining` = places restantes). **Ne pas modifier.**
- `starter/cart-reducer.ts` : les types `CartLine`, `CartState`, `CartAction` et un reducer vide.
- `starter/CartPage.tsx` : l'affichage (badge panier, cartes avec boutons `-` / `+`, récapitulatif), rien n'est branché.

## Étape 1 : le reducer (10 min)

Complétez `cartReducer` dans `cart-reducer.ts` :

| Action | Règle |
|---|---|
| `cart/added` | Si le billet n'est pas dans le panier : ajoute une ligne avec `quantity: 1`. Sinon : `quantity + 1`. **Jamais plus que `ticket.remaining`** (dans ce cas, renvoyer `state` tel quel). |
| `cart/removed` | `quantity - 1`. Si la quantité tombe à 0, la ligne disparaît. |
| `cart/cleared` | Panier vide. |

Contraintes : fonction **pure**. Pas de `push`, pas de `splice`, pas de `line.quantity++`. On renvoie de **nouveaux** objets et tableaux (`...`, `map`, `filter`).

## Étape 2 : le custom hook `useCart` (8 min)

Créez `starter/useCart.ts` qui appelle `useReducer(cartReducer, initialCartState)` et renvoie :

```ts
{ lines, totalTickets, totalPrice, quantityOf(ticketId), add(ticket), remove(ticketId), clear() }
```

- `totalTickets` et `totalPrice` sont **calculés** à partir de `lines` (avec `reduce`). On ne les stocke **pas** dans le state.
- Les composants ne doivent plus jamais voir `dispatch` ni les noms d'actions.

Test rapide : appelez `useCart()` dans `CartBadge` **et** dans `TicketCard`. Cliquez sur `+`. Le badge ne bouge pas. Pourquoi ? (Réponse à l'étape 3.)

## Étape 3 : le Context (12 min)

Pour que tous les composants partagent **le même** panier :
1. `starter/cart-context.ts` : `createContext<CartContextValue | undefined>(undefined)` avec `type CartContextValue = ReturnType<typeof useCart>`.
2. `starter/CartProvider.tsx` : appelle `useCart()` **une seule fois** et rend `<CartContext value={cart}>{children}</CartContext>`.
3. `starter/useCartContext.ts` : `useContext(CartContext)`, et `throw new Error(...)` si la valeur vaut `undefined` (pas de Provider).
4. Dans `CartPage.tsx` : enveloppez tout dans `<CartProvider>`, remplacez chaque `TODO` par `useCartContext()`.

Pourquoi 3 fichiers ? Vite (Fast Refresh) veut que les fichiers `.tsx` n'exportent que des composants. `npm run lint` vous le signale sinon.

**C'est terminé quand** : le badge, les quantités et le récapitulatif bougent ensemble. On ne peut pas dépasser 2 billets « Meetup React ». Le Hackathon (0 place) ne peut pas être ajouté. `npm run lint` et `npm run typecheck` ne signalent rien.

## Bonus (si vous avez fini)

1. **Persistance** : le panier survit à un F5. Un `useEffect` qui écrit dans `localStorage` à chaque changement de state, et une lecture **au démarrage** avec le 3e argument de `useReducer` (`useReducer(cartReducer, undefined, loadCart)`).
2. Désactivez `-` quand la quantité vaut 0 et `+` quand on a atteint `remaining`.
3. Mettez `<CartBadge />` **en dehors** du `<CartProvider>`. Quel message obtenez-vous ? Pourquoi c'est mieux qu'un `undefined` silencieux ?

## Questions pour la correction

- Pourquoi `totalPrice` n'est-il pas dans le state ?
- Pourquoi deux appels à `useCart()` donnent-ils deux paniers différents ?
- Demain, avec Redux Toolkit : à quoi correspondent `cartReducer`, `useCart` et `CartProvider` ?
