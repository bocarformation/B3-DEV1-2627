# Exercice SOLID 1 : brancher une gateway (S + D + L)

**Durée : 35 min.** Travail seul ou en binôme. Correction ensemble ensuite.

## Contexte

Dans EventHub, ce module charge les prochains événements. Il marche, mais :
- on ne peut pas le tester sans réseau ;
- il mélange plusieurs choses.

Copiez ce code dans un fichier `ex1.ts` de votre projet TypeScript de lundi :

```ts
export type EventItem = { id: string; title: string; startsAt: string; capacity: number; booked: number };

export async function loadUpcomingEvents(): Promise<string[]> {
  // 1. accès aux données (URL en dur)
  const res = await fetch('https://api.eventhub.local/events');
  const events: EventItem[] = await res.json();
  // 2. règle métier : à venir + places restantes, triés par date
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.startsAt) > now && e.booked < e.capacity)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  // 3. affichage
  return upcoming.map((e) => `${e.title} (${e.capacity - e.booked} places)`);
}
```

## À faire

1. **(S)** En commentaire : listez les **raisons de changer** de cette fonction. Qui pourrait demander une modification ?
2. **(D)** Créez une interface `EventGateway` avec une méthode `findAll(): Promise<EventItem[]>`.
   Au-dessus, écrivez son **contrat** en une ligne de commentaire (que renvoie-t-elle s'il n'y a aucun événement ?).
3. Écrivez deux classes qui implémentent `EventGateway` :
   - `HttpEventGateway` : utilise `fetch` (l'URL de base est passée au constructeur) ;
   - `InMemoryEventGateway` : renvoie un tableau passé au constructeur.
4. **(S)** Sortez la règle métier dans une fonction **pure** `selectUpcoming(events, now)`, et l'affichage dans `formatEvent(event)`.
5. **(D)** Écrivez le use case :
   ```ts
   type Dependencies = { eventGateway: EventGateway; now: () => Date };
   async function getUpcomingEvents(deps: Dependencies): Promise<EventItem[]>
   ```
   Question : **pourquoi injecter `now`** au lieu d'appeler `new Date()` dedans ?
6. Testez `getUpcomingEvents` **sans réseau** (un `console.log` suffit, ou `node:test` si vous savez faire) :
   - avec `new InMemoryEventGateway([...])` ;
   - puis avec un simple objet : `{ findAll: async () => [] }`. Pourquoi TypeScript l'accepte sans `implements` ?

## Question orale (L)

Que se passerait-il si `InMemoryEventGateway.findAll()` **levait une exception** quand le tableau est vide, alors que `HttpEventGateway` renvoie `[]` ?

## Indice si vous bloquez

La forme `{ eventGateway, now }` est exactement celle du fichier `store/dependencies.ts` que vous aurez dans EventHub.
