// Fausse API EventHub, en mémoire (même idée que InMemoryEventGateway du projet).
// Pas de back-end : un fetch("/api/events") sur le serveur Vite renvoie du HTML

export type EventItem = {
  id: string;
  title: string;
  city: string;
  date: string; // ISO "2026-11-24"
  capacity: number;
  booked: number; // places déjà prises par les AUTRES participants
};

const SEED: readonly EventItem[] = [
  { id: 'e1', title: 'Meetup React', city: 'Paris', date: '2026-11-24', capacity: 30, booked: 28 },
  { id: 'e2', title: 'Atelier TypeScript', city: 'Lyon', date: '2026-11-26', capacity: 12, booked: 4 },
  { id: 'e3', title: 'Conférence Clean Architecture', city: 'Paris', date: '2026-12-03', capacity: 200, booked: 150 },
  { id: 'e4', title: 'Hackathon EventHub', city: 'Nantes', date: '2026-12-10', capacity: 40, booked: 40 },
  { id: 'e5', title: 'Soirée Redux Toolkit', city: 'Lyon', date: '2026-12-15', capacity: 25, booked: 24 },
];

/** '' = toutes les villes. 'Atlantis' déclenche une erreur simulée. */
export const CITIES = ['', 'Paris', 'Lyon', 'Nantes', 'Atlantis'] as const;

let calls = 0;
const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** 400 ms de latence, renvoie une COPIE des données (le client ne peut pas modifier la "base"). */
export async function fetchEvents(city = ''): Promise<EventItem[]> {
  calls += 1;
  console.info(`[API] fetchEvents("${city}") - appel n°${calls}`);
  await delay(400);
  if (city === 'Atlantis') throw new Error('Ville inconnue (erreur simulée par la fausse API)');
  return SEED.filter((e) => city === '' || e.city === city).map((e) => ({ ...e }));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'long' });
}
