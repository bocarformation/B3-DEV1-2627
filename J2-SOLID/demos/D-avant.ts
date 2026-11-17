// D AVANT (violation) : le métier (Inscription) crée lui-même son outil technique (GmailMailer).
class GmailMailer {
  envoyer(destinataire: string, message: string): void {
    console.log(`[GMAIL - VRAI ENVOI] -> ${destinataire} : ${message}`);
  }
}

class Inscription {
  private mailer = new GmailMailer(); // dépendance CONCRÈTE, cachée à l'intérieur

  inscrire(email: string): void {
    console.log(`Compte créé pour ${email}`);
    this.mailer.envoyer(email, 'Bienvenue sur EventHub !');
  }
}

console.log('=== D AVANT : Inscription fait new GmailMailer() ===');
new Inscription().inscrire('alice@example.com');

console.log('\nProblème 1 : pour TESTER inscrire(), un vrai mail part. Impossible de mettre un faux.');
console.log('Problème 2 : passer de Gmail à Brevo = MODIFIER Inscription (le métier).');
console.log('=> Le haut niveau (métier) dépend du bas niveau (technique). Flèche dans le mauvais sens.');
