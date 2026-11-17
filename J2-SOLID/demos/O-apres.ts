
// O AVANT (violation) : pour ajouter un mode de livraison, il faut MODIFIER une fonction qui marche déjà.
type Mode = 'standard' | 'express';

function fraisDePort(mode: Mode, poidsKg: number): number {
  if (mode === 'standard') return 5;
  if (mode === 'express') return 10 + poidsKg * 2;
  // if(mode === 'relais') return 3;
  throw new Error(`Mode de livraison inconnu : ${mode}`);
}

console.log('=== O AVANT : un if par mode de livraison ===');
console.log('standard, 2 kg :', fraisDePort('standard', 2), 'EUR');
console.log('express,  2 kg :', fraisDePort('express', 2), 'EUR');
console.log('\nLe client demande "point relais à 3 EUR".');
try {
  // On simule l'appel venu du front, avant d'avoir modifié fraisDePort :
  console.log('relais, 2 kg :', fraisDePort('relais' as Mode, 2), 'EUR');
} catch (e) {
  console.log('CRASH :', (e as Error).message);
}
console.log('=> Pour corriger, je dois OUVRIR fraisDePort ET le type Mode, du code déjà testé.');
console.log('=> Chaque nouveau mode = une modification = un risque de casser standard ou express.');


// ----

interface ModeLivraison {
  readonly id: string;
  frais(poidsKg: number): number;
}

// const ups: ModeLivraison = { id: "UPS", frais: () => 5};
class CalculateurLivraison {
  private modes = new Map<string, ModeLivraison>();

  constructor(modes: ModeLivraison[]) {
    modes.map(m => this.modes.set(m.id, m));
  }

  frais(id: string, kg: number){
    const mode = this.modes.get(id);
    if (!mode) {
      throw new Error(`Mode inconnu: ${id}`)
    }
    return mode.frais(kg)
  }
}

const standard: ModeLivraison = {id: "standard",  frais: () => 5};
const express: ModeLivraison = {id: "express",  frais: (kg) => 10 + kg * 2};

// EXTENSION: nouveau code ajouté, ON NE MODIFIE RIEN AU DESSUS
const relais: ModeLivraison = {id: "relais", frais: () => 3};
console.log('=== O APRES : un mode = un objet, branché sur la liste ===');
const calculateur = new CalculateurLivraison([standard, express, relais]);
for(const id of ["standard", "express", "relais"]) {
  console.log(`${id}, 2 kg:`, calculateur.frais(id, 2), 'EUR');
  
}
console.log("Le seul endroit qui change: la liste passée au constructeur (la composition)");
