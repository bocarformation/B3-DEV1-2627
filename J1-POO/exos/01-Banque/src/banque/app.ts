import { Account } from "./Account";

const acc = new Account(500);
acc.deposit(0.1); acc.deposit(0.2);
console.log(`${acc}`, acc.number);
