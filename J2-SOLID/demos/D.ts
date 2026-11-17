// LIVE D - DÉPART (ce qui est à l'écran au début)
// Le service de rappel (métier) fabrique lui-même son envoi d'e-mails (technique).
type EventItem = { id: string; title: string };

class SmtpEmailSender {
  send(to: string, subject: string): void {
    console.log(`[SMTP - VRAI ENVOI] -> ${to} : ${subject}`);
  }
}

class ReminderService {
  private sender = new SmtpEmailSender(); // dépendance concrète, cachée

  remindParticipants(event: EventItem, participants: string[]): number {
    for (const p of participants) {
      this.sender.send(p, `Rappel : "${event.title}" commence dans 1 h`);
    }
    return participants.length;
  }
}

console.log('=== LIVE D - départ ===');
const sent = new ReminderService().remindParticipants({ id: 'e1', title: 'Meetup React' }, ['alice@example.com', 'bob@example.com']);
console.log(`${sent} rappels envoyés`);
// Questions : comment tester sans spammer Alice et Bob ? Comment ajouter les SMS et le push ?
