// O AVANT (violation) : pour ajouter un mode de livraison, il faut MODIFIER une fonction qui marche déjà.
type Mode = 'standard' | 'express';

function fraisDePort(mode: Mode, poidsKg: number): number {
  if (mode === 'standard') return 5;
  if (mode === 'express') return 10 + poidsKg * 2;
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
