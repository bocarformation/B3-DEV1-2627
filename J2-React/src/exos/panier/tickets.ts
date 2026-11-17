// Données fournies
export type Ticket = {
  id: string;
  title: string;
  price: number; // en euros
  remaining: number; // places encore disponibles
};

export const TICKETS: Ticket[] = [
  { id: 't1', title: 'Meetup React', price: 0, remaining: 2 },
  { id: 't2', title: 'Atelier TypeScript', price: 25, remaining: 8 },
  { id: 't3', title: 'Conférence Clean Architecture', price: 49, remaining: 50 },
  { id: 't4', title: 'Hackathon EventHub', price: 15, remaining: 0 },
];
