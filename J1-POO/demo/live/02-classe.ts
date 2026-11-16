// 02 - Classe + constructeur (2 notations)

// Notation longue: on déclare puis on assigne dans le constructeur
class LongProduct{
    name: string;
    priceHT: number;

    constructor(name: string, priceHT: number) {
        this.name = name;
        this.priceHT = priceHT
    }
}

// Notation courte ("parameter properties") : on déclare + assigne en une ligne
// A lancer uniquement en TS

class Product {
    constructor(public name: string, public priceHT: number){}

    priceTTC(): number {
        return Math.round(this.priceHT * 1.2 * 100) / 100;
    }

    toString(): string{
        return `${this.name} : ${this.priceTTC()} EUR TTC`;
    }

}

const a = new LongProduct("Clavier", 40);
const b = new Product("Souris", 25);
const c = new Product("Ecran", 150);

console.log("1. Objet (notation longue) : ", a);
console.log("2. Objet (notation courte) : ", b);
console.log("3. Méthode prixTTC() :", b.priceTTC());
console.log("4. Méthode toString() dans un template:", `${c}`);

