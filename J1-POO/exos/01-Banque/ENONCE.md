# Exercice Banque (14h30 - 16h30)

On simule une banque en TypeScript : **un fichier par classe** + un fichier `app.ts` qui fait le scénario.

## Organisation

Dans dans le dossier exos/01-Banque, crée un dossier `src/banque/` :

```
src/banque/
├── utils.ts        (fourni ci-dessous)
├── Account.ts
├── Client.ts
├── Bank.ts
├── CreditCard.ts
└── app.ts          (le scénario)
```

- Chaque classe commence par `export class ...` et on l'importe là où on en a besoin :
  `import { Account } from "./Account";`
- Lancer : `npx tsx src/banque/app.ts`  

**Fichier fourni** `utils.ts` (à copier tel quel) :

```ts
export class Utils {
  /** Entier aléatoire entre min et max, les DEUX bornes INCLUSES. */
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
```

## Partie 1 - Comptes et clients (environ 1 h)

**`Account`** (un compte bancaire)
- `number` : un numéro de **8 chiffres** tiré au hasard, en `string` (ex : `"48213907"`).
- Un solde qui démarre à 0, **sauf** si on passe un dépôt initial au constructeur : `new Account(200)`.
- `deposit(amount: number): void` et `withdraw(amount: number): void` (montants en euros).
- `getBalance(): number` renvoie le solde en euros.
- `toString(): string` renvoie par exemple `"200.00 EUR"`.

**Règles** (c'est une banque, pas un jeu) :
1. Un montant **négatif, nul ou invalide (NaN)** est refusé : `throw new Error("...")`.
2. **Pas de découvert** : on ne peut pas retirer plus que le solde.
3. Le solde ne doit **jamais** pouvoir être modifié depuis l'extérieur de la classe (`private`).
4. Indice : en JS, `0.1 + 0.2` vaut `0.30000000000000004`. Stocke le solde **en centimes entiers** (`Math.round(amount * 100)`) et ne convertis en euros que pour l'afficher.

**`Client`** : prénom (`firstname`), nom (`lastname`), ville (`city`), salaire (`salary`).
- À la création d'un client, **son compte est créé automatiquement** dans le constructeur, avec un dépôt initial optionnel : `new Client("Sam", "Solo", "Paris", 1500, 200)`.
- On accède au compte avec `client.account`.

**`Bank`** : un nom (`name`) et une liste de clients (vide au départ).
- `addClient(client: Client): void` ajoute le client à la liste.
- `getClients()` renvoie la liste.

## Partie 2 - Carte bancaire (environ 45 min)

**`CreditCard`** est liée à un compte (`new CreditCard(account)`, accessible via `cb.account`) et contient, générés au hasard à sa création :
- `cardNumber` : 16 chiffres au format `"XXXX XXXX XXXX XXXX"` ;
- `cvc` : 3 chiffres au format `"XXX"` (ex : `"042"`, le 0 au début compte) ;
- `expiryDate` : date de création **+ 5 ans**, au format `"MM/YY"` (ex : créée le 16/11/2026 → `"11/31"`).

**`Bank.requestCreditCard(client: Client): CreditCard`** crée et renvoie une carte pour le compte du client.

Indices :
- Un chiffre au hasard : `Utils.getRandomInt(0, 9)` (**pas** `0, 10` : les bornes sont incluses).
- Plusieurs chiffres : `Array.from({ length: 16 }, () => Utils.getRandomInt(0, 9)).join("")`.
- Couper en blocs de 4 : `"1234567812345678".match(/.{4}/g)` donne `["1234", "5678", "1234", "5678"]`.
- Compléter avec un 0 : `String(7).padStart(2, "0")` donne `"07"`. Attention : `getMonth()` renvoie 0 pour janvier.

## Scénario attendu dans `app.ts`

```ts
const bnp = new Bank("BNP Paribas");
const sam = new Client("Sam", "Solo", "Paris", 1500, 200);
bnp.addClient(sam);
sam.account.deposit(800);
sam.account.withdraw(700);
console.log(`${sam.account}`);          // 300.00 EUR
const cb = bnp.requestCreditCard(sam);
console.log(cb.cardNumber, cb.expiryDate, cb.cvc);
sam.account.deposit(-50);               // doit lever une erreur (utilise try/catch pour continuer)
```

## Bonus (pour ceux qui ont fini)

1. **Tests automatiques** : demandez moi le fichier `scenario.ts`, pose-le à côté de tes classes et lance `npx tsx src/banque/scenario.ts`. Tous les tests passent ?
2. `requestCreditCard` refuse (erreur) un client qui n'est **pas** dans la liste de la banque.
3. `transfer(to: Account, amount: number)` dans `Account` : un virement entre deux comptes (si le retrait échoue, rien ne doit bouger).
4. Historique : chaque compte garde la liste de ses opérations (`{ type: "depot" | "retrait", montant: number, date: Date }`) et sait l'afficher.
5. `Bank.getTotalDeposits(): number` : la somme des soldes de tous les clients.
6. Une CB n'est accordée qu'aux clients majeurs : ajoute `birthDate: Date` à `Client`.
