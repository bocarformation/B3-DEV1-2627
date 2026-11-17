import { Account } from "./Account";
import { Utils } from "./utils";

export class CreditCard {
    public readonly cardNumber: string;
    public readonly cvc: string; 
    public readonly expiryDate: string;

    constructor(public readonly account: Account, creationDate: Date = new Date()) {
        this.cardNumber = CreditCard.generateCardNumber();
        this.cvc = Utils.randomDigits(3);
        this.expiryDate = CreditCard.generateExpiryDate(creationDate);
    }

    private static generateCardNumber(): string {
        const digits = Utils.randomDigits(16);
        return digits.match(/.{4}/g)?.join(" ") ?? "";
    }

    private static generateExpiryDate(creationDate: Date): string {
        const mm = String(creationDate.getMonth() + 1).padStart(2,"0");
        const yy = String(creationDate.getFullYear() + 5).padStart(2,"0");
        
        return `${mm}/${yy}`
    }
}