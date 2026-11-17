import { Client } from "./Client";
import { CreditCard } from "./CreditCard";

export class Bank {
    private clients: Client[] = [];

    constructor(public readonly name: string) {}

    addClient(client: Client): void {
        // NE PAS recréer de compte ici ! il existe déjà (sinon on va perdre le dépot initial)
        this.clients.push(client);
    }

    getClients(): readonly Client[]{
        return this.clients;
    }

    requestCreditCard(client: Client): CreditCard {
        if(!this.clients.includes(client)){
            throw new Error(`${client.getFullName()} n'est pas un client de ${this.name}`);
        }
        return new CreditCard(client.account);
    }
}
