// 05 - Composition relation "A UN"

class Identity {
    constructor(public name: string, public brand: string, public year: number){}
}

class Engine {
    constructor(public type: string, public horsePower: number) {}

    start(): string {
        return `moteur ${this.type} ${this.horsePower} ch: vroum vroum !`;
    }
}


class Car {
    // Une CAR  A UNE IDENTITY et A UN ENGINE
    constructor(public identity: Identity, private engine: Engine) {}

    // Car DELEGUE le travail à son moteur 
    start(): string{
        return `${this.identity.brand} ${this.identity.name} => ${this.engine.start()}`;
    }

    // Avantage: on peut changer une pièce sans toucher au reste
    changeEngine(newEngine: Engine): void {
        this.engine = newEngine;
    }


}

const classeA =  new Car(new Identity("Classe A", "Mercedes Benz", 2025), new Engine("Electrique", 130));
console.log("1. Objet composé: ", classeA);
console.log("2.", classeA.start());

classeA.changeEngine(new Engine("Diesel", 150));
console.log("3. Changement de moteur: ", classeA.start());
