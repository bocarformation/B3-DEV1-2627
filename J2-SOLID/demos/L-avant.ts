// L AVANT (violation) : le classique Rectangle / Carré.
// "Un carré EST un rectangle" en maths... mais pas en comportement !
class Rectangle {
  constructor(protected largeur: number, protected hauteur: number) {}
  setLargeur(l: number) { this.largeur = l; }
  setHauteur(h: number) { this.hauteur = h; }
  aire() { return this.largeur * this.hauteur; }
}

class Carre extends Rectangle {
  constructor(cote: number) { super(cote, cote); }
  // Pour rester un carré, on change AUSSI l'autre côté : le contrat du parent est cassé.
  setLargeur(l: number) { this.largeur = l; this.hauteur = l; }
  setHauteur(h: number) { this.largeur = h; this.hauteur = h; }
}

// Code client écrit pour Rectangle. Il compte sur : "setLargeur ne touche pas la hauteur".
function redimensionner5x4(r: Rectangle): number {
  r.setLargeur(5);
  r.setHauteur(4);
  return r.aire(); // attendu : 20
}

console.log('=== L AVANT : Carre extends Rectangle ===');
console.log('Rectangle :', redimensionner5x4(new Rectangle(1, 1)), '(attendu 20)');
console.log('Carre     :', redimensionner5x4(new Carre(1)), '(attendu 20) <- FAUX');
console.log('\nTypeScript n\'a affiché AUCUNE erreur (npm run typecheck : 0 erreur).');
console.log('=> TS vérifie les SIGNATURES. Liskov parle du COMPORTEMENT (le contrat).');
