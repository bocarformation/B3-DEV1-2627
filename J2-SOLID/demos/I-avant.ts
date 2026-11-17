// I AVANT (violation) : une grosse interface. Tout le monde dépend de tout.
interface Imprimante {
  imprimer(doc: string): string;
  scanner(): string;
  faxer(numero: string): string;
}

class Multifonction implements Imprimante {
  imprimer(doc: string) { return `Impression de "${doc}"`; }
  scanner() { return 'Scan OK (scan.pdf)'; }
  faxer(numero: string) { return `Fax envoyé au ${numero}`; }
}

// Obligée d'implémenter scanner() et faxer() alors qu'elle ne sait pas le faire...
class PetiteImprimante implements Imprimante {
  imprimer(doc: string) { return `Impression de "${doc}"`; }
  scanner(): string { throw new Error('Je ne sais pas scanner'); }
  faxer(): string { throw new Error('Je ne sais pas faxer'); }
}

// Client : le service de numérisation n'utilise QUE scanner()... mais accepte toute Imprimante.
function numeriser(machine: Imprimante): string {
  return machine.scanner();
}

console.log('=== I AVANT : interface Imprimante à 3 méthodes ===');
for (const machine of [new Multifonction(), new PetiteImprimante()]) {
  try {
    console.log(machine.constructor.name, '->', numeriser(machine));
  } catch (e) {
    console.log(machine.constructor.name, '-> CRASH :', (e as Error).message);
  }
}
console.log('\nTypeScript n\'a rien dit : le bug n\'apparaît qu\'à l\'exécution.');
console.log('=> Des méthodes "throw not supported" = interface trop grosse.');
