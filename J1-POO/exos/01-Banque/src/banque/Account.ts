import { Utils } from "./utils";

export class Account {
    public readonly number: string;
    private balanceInCents: number; 

    constructor(initialDeposit: number = 0) {
        this.number = String(Utils.getRandomInt(10_000_000, 99_999_999)); // toujours avoir 8 chiffres
        this.balanceInCents = initialDeposit === 0 ? 0 : Account.toCents(initialDeposit);
    }

    private static toCents(amount: number): number {
        if(!Number.isFinite(amount) || amount <= 0) { // isFinite() refuse en NaN et Infinity en une seule ft
            throw new Error("Montant invalide: " + amount + "(il faut un nombre positif)");
        }
        return Math.round(amount * 100); 
    }

    deposit(amount: number): void{
        this.balanceInCents += Account.toCents(amount);
    }

    withdraw(amount: number): void {
        const cents = Account.toCents(amount);
        if(cents > this.balanceInCents) {
            throw new Error(`Solde insuffisant : ${this.toString()}, retrait demandé ${amount} EUR `)
        }
        this.balanceInCents -= cents;
    }

    getBalance(): number {
        return this.balanceInCents / 100; 
    }

    toString(): string {
        return `${this.getBalance().toFixed(2)} EUR`
    }
}

