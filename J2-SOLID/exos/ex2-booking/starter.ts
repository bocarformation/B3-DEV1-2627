// EXERCICE 2 - STARTER (à distribuer)
// Règles de réservation EventHub. Chaque nouvelle règle demandée par le client oblige à modifier canBook.
export type EventItem = { id: string; startsAt: string; capacity: number; booked: number; visibility: 'public' | 'private'; organizerId: string };
export type Member = { id: string; invitedTo: string[]; banned: boolean };

export function canBook(event: EventItem, member: Member, now: Date): { ok: true } | { ok: false; reason: string } {
  if (member.banned) return { ok: false, reason: 'Compte suspendu' };
  if (event.booked >= event.capacity) return { ok: false, reason: 'Complet' };
  if (new Date(event.startsAt) <= now) return { ok: false, reason: 'Événement passé' };
  if (event.visibility === 'private' && !member.invitedTo.includes(event.id)) return { ok: false, reason: 'Sur invitation' };
  return { ok: true };
}
// Nouvelle demande : "un organisateur ne peut pas réserver son propre événement"
// Nouvelle demande : "les réservations ferment 2h avant le début"
