// LIVE S - DÉPART (ce qui est à l'écran au début)
// BookingService d'EventHub : il vérifie, il stocke, il rédige ET envoie le mail. Tout est mélangé.
type EventItem = { id: string; title: string; capacity: number; booked: number };
type Booking = { eventId: string; email: string };

class BookingService {
  private events: EventItem[] = [{ id: 'e1', title: 'Meetup React', capacity: 2, booked: 1 }];
  private bookings: Booking[] = [];

  book(eventId: string, email: string): void {
    // (a) règles métier
    const event = this.events.find((e) => e.id === eventId);
    if (!event) throw new Error('Événement introuvable');
    if (event.booked >= event.capacity) throw new Error('Complet');

    // (b) stockage
    this.bookings.push({ eventId, email });
    event.booked++;

    // (c) notification : texte + envoi
    console.log(`[MAIL -> ${email}] Votre place pour "${event.title}" est confirmée !`);
  }
}

console.log('=== LIVE S - départ ===');
const service = new BookingService();
service.book('e1', 'alice@example.com');
try {
  service.book('e1', 'bob@example.com');
} catch (e) {
  console.log('Refusé :', (e as Error).message);
}
