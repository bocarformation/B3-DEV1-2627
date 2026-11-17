# Exercice SOLID 2 : règles de réservation (O + L + I)

**Durée : 25 min.** Travail seul ou en binôme. Correction ensemble ensuite.

## Contexte

Dans EventHub, `canBook` décide si un membre peut réserver un événement.
Copiez ce code dans un fichier `ex2.ts` :

```ts
export type EventItem = { id: string; startsAt: string; capacity: number; booked: number; visibility: 'public' | 'private'; organizerId: string };
export type Member = { id: string; invitedTo: string[]; banned: boolean };

export function canBook(event: EventItem, member: Member, now: Date): { ok: true } | { ok: false; reason: string } {
  if (member.banned) return { ok: false, reason: 'Compte suspendu' };
  if (event.booked >= event.capacity) return { ok: false, reason: 'Complet' };
  if (new Date(event.startsAt) <= now) return { ok: false, reason: 'Événement passé' };
  if (event.visibility === 'private' && !member.invitedTo.includes(event.id)) return { ok: false, reason: 'Sur invitation' };
  return { ok: true };
}
```

Le client demande **2 nouvelles règles** :
- « un organisateur ne peut pas réserver son propre événement » ;
- « les réservations ferment 2 h avant le début ».

Problème : à chaque nouvelle règle, il faut **modifier** `canBook`, qui est déjà testée.

## À faire

1. Créez les types :
   ```ts
   type BookingContext = { event: EventItem; member: Member; now: Date };
   interface BookingRule { check(ctx: BookingContext): string | null }
   ```
   Au-dessus de `BookingRule`, écrivez son **contrat** en commentaire : que renvoie `check` si la règle est respectée ? A-t-elle le droit de lever une exception ? De modifier `ctx` ?
2. Réécrivez les **4 règles existantes** en `BookingRule` (un objet `{ check: ... }` suffit, pas besoin de classe).
3. Écrivez une classe `BookingPolicy` qui reçoit une liste de règles dans son constructeur et expose `canBook(ctx)`. Elle renvoie le **premier** refus, ou `{ ok: true }`.
4. **(O)** Ajoutez les **2 nouvelles règles sans modifier `BookingPolicy`**.
   Astuce pour la seconde : une fonction qui **fabrique** une règle, `closesBefore(hours: number): BookingRule`.
5. Vérifiez que votre `BookingPolicy` donne **les mêmes réponses** que l'ancien `canBook` sur quelques cas (non-régression).

## Bonus (L)

Écrivez un **test de contrat** : une boucle qui passe *toutes* vos règles sur les mêmes contextes (dont un événement avec `startsAt: 'pas une date'`) et vérifie que chaque `check` renvoie bien `null` ou un `string`, sans lever d'exception.

## Question orale (I)

Pourquoi `check` reçoit-il un petit `BookingContext` plutôt que **tout le state Redux** de l'application ?
