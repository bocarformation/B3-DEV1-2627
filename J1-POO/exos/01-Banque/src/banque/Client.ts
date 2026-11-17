import { Account } from "./Account";

export class Client {
    public readonly account: Account;
    constructor(
        public firstname: string,
        public lastname: string,
        public city: string, 
        public salary: number,
        initialDeposit: number = 0, // PAS de public, c'est une propriété de Account pas du Client
    ) {
        this.account = new Account(initialDeposit);
    }

    getFullName(): string {
        return `${this.firstname} ${this.lastname}`
    }

}