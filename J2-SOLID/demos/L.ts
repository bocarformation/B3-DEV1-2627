// L AVANT (violation) : le classique Rectangle / Carré.
// "Un carré EST un rectangle" en maths... mais pas en comportement !

interface Forme{
  aire(): number;
}
class Rectangle implements Forme{
  constructor(private largeur: number, private hauteur: number) {}
  setLargeur(l: number) { this.largeur = l; }
  setHauteur(h: number) { this.hauteur = h; }
  aire() { return this.largeur * this.hauteur; }
}

class Carre implements Forme {
  constructor(private cote: number) {}
  setCote(c: number) { this.cote = c;}
  aire() {return this.cote * this.cote;}
}

// Code client écrit pour Rectangle. Il compte sur : "setLargeur ne touche pas la hauteur".
function redimensionner5x4(r: Rectangle): number {
  r.setLargeur(5);
  r.setHauteur(4);
  return r.aire(); // attendu : 20
}

// Code client qui marche avec TOUTES LES FORMES: le contrat de aire() est le même pour tous
const aireTotale = (formes: Forme[]) => formes.reduce((s, f) => s + f.aire(),0 ); 


console.log('=== L APRES : Rectangle et Carré implémentent Forme ===');
console.log('Rectangle 5x4 :', redimensionner5x4(new Rectangle(1, 1)), '(attendu 20)');
console.log('=>Aire totale (rect 5x4) + carré 3:', aireTotale([new Rectangle(5,4), new Carre(3)]));

// Jamais exécuté: prouve que le compilateur refuse maintenant le carré à la place du rectangle
// export const uneErreur = () => {
  
//   redimensionner5x4(new Carre(1));
// }
