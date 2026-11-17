// EXERCICE 1 - STARTER (à distribuer)
// Ce module charge les prochains événements d'EventHub. Il fonctionne... mais il est intestable
// sans réseau et mélange plusieurs responsabilités.
export type EventItem = { id: string; title: string; startsAt: string; capacity: number; booked: number };
export type Dependencies = { eventGateway: EventGateway; now: () => Date};

export interface EventGateway {
  // Contrat: renvoie tous les événements (ça renvoie un tableau vide [] si y'a aucun event)
  findAll(): Promise<EventItem[]>;
}

export class HttpEventGateway implements EventGateway {
  constructor(private readonly baseUrl: string) {}

  async findAll(): Promise<EventItem[]> {
    const res = await fetch(`${this.baseUrl}/events`);
    if(!res.ok){
      throw new Error(`HTTP ${res.status}`)
    }
    return res.json() as Promise<EventItem[]>;
  }
}

export class InMemoryEventGateway implements EventGateway {
  constructor(private readonly events: EventItem[] = []) {}

  async findAll(): Promise<EventItem[]> {
    return [...this.events]; // une copie, personne ne peut modifier notre tableau de l'extérieur
  }
}

export function selectUpcoming(events: EventItem[], now: Date): EventItem[] {
  return events
    .filter((e) => new Date(e.startsAt) > now && e.booked < e.capacity)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export const formatEvent = (e: EventItem) => `${e.title} (${e.capacity - e.booked} places)`

export async function getUpcomingEvents(deps: Dependencies): Promise<EventItem[]> {
  const events = await deps.eventGateway.findAll();
  return selectUpcoming(events, deps.now());
}


