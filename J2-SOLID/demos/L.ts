// LIVE L - DÉPART (ce qui est à l'écran au début)
// Deux gateways implémentent EventGateway. TypeScript est content... et pourtant.
type EventItem = { id: string; title: string };

interface EventGateway {
  /** CONTRAT : renvoie l'événement, ou null s'il n'existe pas. */
  findById(id: string): Promise<EventItem | null>;
}

// Version utilisée dans les tests
class InMemoryEventGateway implements EventGateway {
  constructor(private readonly events: EventItem[]) {}
  async findById(id: string): Promise<EventItem | null> {
    return this.events.find((e) => e.id === id) ?? null;
  }
}

// Version "prod" : simule l'API REST (200 si trouvé, 404 sinon)
const fakeServer: Record<string, EventItem> = { e1: { id: 'e1', title: 'Meetup React' } };
async function callApi(path: string): Promise<{ status: number; body: EventItem | null }> {
  const id = path.split('/').pop() ?? '';
  const found = fakeServer[id];
  return found ? { status: 200, body: found } : { status: 404, body: null };
}

class ApiEventGateway implements EventGateway {
  async findById(id: string): Promise<EventItem | null> {
    const res = await callApi(`/events/${id}`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    return res.body;
  }
}

// Code client (en EventHub : un use case / un thunk), écrit en lisant le CONTRAT
async function eventTitle(gateway: EventGateway, id: string): Promise<string> {
  const event = await gateway.findById(id);
  return event ? event.title : 'Événement introuvable';
}

console.log('=== LIVE L - départ ===');
const gateways: EventGateway[] = [new InMemoryEventGateway([{ id: 'e1', title: 'Meetup React' }]), new ApiEventGateway()];
for (const gateway of gateways) {
  console.log(gateway.constructor.name);
  try {
    console.log('  e1  ->', await eventTitle(gateway, 'e1'));
    console.log('  zzz ->', await eventTitle(gateway, 'zzz'));
  } catch (e) {
    console.log('  CRASH :', (e as Error).message, '<- et npm run typecheck ne signale RIEN');
  }
}
