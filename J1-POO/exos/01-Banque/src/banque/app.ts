import { Account } from "./Account";
import { Bank } from "./Bank";
import { Client } from "./Client";

// const acc = new Account(500);
// acc.deposit(0.1); acc.deposit(0.2);
// console.log(`${acc}`, acc.number);
// -----

const sam = new Client("Sam", "GEROS", "Paris", 800, 10);

// console.log(client);

// ------
const cic = new Bank("CIC"); 
cic.addClient(sam);
sam.account.deposit(800);
sam.account.withdraw(700);
console.log(cic.getClients());

const cb = cic.requestCreditCard(sam);
console.log(cb.cardNumber, cb.expiryDate, cb.cvc);

try {
    sam.account.deposit(50);

} catch (error) {
    console.log('Refusé: ', (error as Error).message);
    
}
console.log("solde: ", sam.account);
