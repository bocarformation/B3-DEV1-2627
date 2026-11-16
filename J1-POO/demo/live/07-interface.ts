// 07 - Interface (Contrat, sans code)

interface Display {
    show(): string;
}

interface Pay{
    readonly price: number; //  lecture seule
    discount?: number; // Optionnel
}

class Ticket implements Display, Pay {
    constructor(public readonly price: number, public evenement: string, public discount: number){}

    show(): string{
        const sum = this.price - (this.discount ?? 0);
        return `Billet ${this.evenement} : ${sum} EUR`
    }
}

class Badge implements Display {
    constructor(private name: string) {}
    show(): string {return `Badge de ${this.name}`};
}

// Le code qui utilise l'interface ne ne tient pas compte de la classe réelle
function print(items: Display[]): void {
    items.forEach(item => console.log(" - ", item.show()))
}

print([new Ticket(30, "Concert", 5), new Badge("Mariam")]);


// L'interface disparait à la compilation "x instanceof Display" est impossible
console.log("3. typeof Ticket =", typeof Ticket);
