// EXERCICE 1 - STARTER (à distribuer)
// Ce module charge les prochains événements d'EventHub. Il fonctionne... mais il est intestable
// sans réseau et mélange plusieurs responsabilités.
export type EventItem = { id: string; title: string; startsAt: string; capacity: number; booked: number };

export async function loadUpcomingEvents(): Promise<string[]> {
  // 1. accès aux données (détail technique, URL en dur)
  const res = await fetch('https://api.eventhub.local/events');
  const events: EventItem[] = await res.json();
  // 2. règle métier : à venir + places restantes, triés par date
  const now = new Date();
  const upcoming = events
    .filter((e) => new Date(e.startsAt) > now && e.booked < e.capacity)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt));
  // 3. présentation
  return upcoming.map((e) => `${e.title} (${e.capacity - e.booked} places)`);
}
