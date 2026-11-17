// S AVANT (violation) : une seule classe, mais TROIS personnes peuvent demander de la modifier.
type Note = { matiere: string; valeur: number };

class Bulletin {
  constructor(private eleve: string, private notes: Note[]) {}

  // Raison de changer n°1 : la règle de calcul (direction des études)
  moyenne(): number {
    const total = this.notes.reduce((somme, n) => somme + n.valeur, 0);
    return Math.round((total / this.notes.length) * 10) / 10;
  }

  // Raison de changer n°2 : la mise en forme (service communication)
  afficher(): string {
    return `Bulletin de ${this.eleve} : ${this.moyenne()}/20`;
  }

  // Raison de changer n°3 : le stockage (équipe technique)
  sauvegarder(): void {
    console.log(`[BDD] INSERT INTO bulletins VALUES ('${this.eleve}', ${this.moyenne()})`);
  }
}

console.log('=== S AVANT : la classe Bulletin fait tout ===');
const bulletin = new Bulletin('Alice', [{ matiere: 'TS', valeur: 14 }, { matiere: 'React', valeur: 17 }]);
console.log(bulletin.afficher());
bulletin.sauvegarder();
console.log('\nQui peut demander une modification de Bulletin ?');
console.log('  - la direction des études (coefficients)');
console.log('  - la communication (format du bulletin)');
console.log("  - l'équipe tech (passer de MySQL à une API)");
console.log('=> 3 acteurs = 3 raisons de changer = SRP violé.');
