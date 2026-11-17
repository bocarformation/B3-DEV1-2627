import test from "node:test";
import { EventItem } from "./starter";
import { formatEvent, getUpcomingEvents, HttpEventGateway, InMemoryEventGateway } from "./ex1";
import assert from "node:assert/strict";

const date = new Date("2026-11-17");
const events: EventItem[] = [
  { id: 'past', title: 'Passé', startsAt: '2026-11-01T18:00:00Z', capacity: 10, booked: 0 },
  { id: 'full', title: 'Complet', startsAt: '2026-12-01T18:00:00Z', capacity: 10, booked: 10 },
  { id: 'b', title: 'React Paris', startsAt: '2026-12-10T18:00:00Z', capacity: 50, booked: 20 },
  { id: 'a', title: 'TS Meetup', startsAt: '2026-11-20T18:00:00Z', capacity: 30, booked: 29 },
];


test("DIP: le use case fonctionne avec une gateway en mémoire, sans réseau", async () => {
    const result = await getUpcomingEvents({eventGateway: new InMemoryEventGateway(events), now: () => date});
    assert.deepEqual(result.map(e => e.id), ["a","b"]);
    assert.equal(formatEvent(result[0]), "TS Meetup (1 places)");
})

test("LSP: HttpEventGateway respecte le même contrat (simulation de fetch)", async () => {
    const realFetch = globalThis.fetch;
    globalThis.fetch = (async () => new Response(JSON.stringify(events))) as typeof fetch;

    try{
        const result = await getUpcomingEvents({eventGateway: new HttpEventGateway("http://fake"), now: () => date});
        assert.deepEqual(result.map(e => e.id), ["a", "b"]);
    } finally {
        globalThis.fetch = realFetch;
    }
})