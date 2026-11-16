// 04 - Héritage - EST UN

class User {
    constructor(public name: string, protected email: string) {}

    login(): string {
        return `${this.name} est connecté`;
    }
}

// Admin EST UN User donc il récupère name, email et login()
class Admin extends User {

    // /!\  ne PAS remettre "public name" ici, car il est déclaré dans User
    constructor(name: string, email: string, private readonly level: number) {
        super(name, email); // obligatoire et AVANT tout "this"
    }

    // ... je peux REDEFINIR (override) une méthode du parent
    override login(): string {
        return `${super.login()} (admin niveau: ${this.level}, ${this.email})`
    }

    ban(u: User): string{
        return `${this.name} a banni ${u.name}, donc tu dégages !`;
    }
}

const mathis = new User("Mathis", "mathis.roseau@3wacademy.fr");
const issa = new Admin("Issa", "issa.clement@3wacademy.fr", 5);

console.log("1.", mathis.login());
console.log("2.", issa.login());
console.log("3.", issa.ban(mathis));
// console.log("4.", mathis.ban(issa)); // TS2339! un USER n'a pas la ft ban();
// console.log(issa.email); // protected = visible classe parent + enfant

// Polymorphisme
const all: User[] = [mathis, issa];
// all.forEach(u => {
//     if(u instanceof "User"){
//         // travail...
//     } else if (u instanceof "Admin"){
//         // travail
//     }
// })
all.map(u => console.log("4.", u.login()));
console.log("Mathis est de type User ?", mathis instanceof User, "Issa est de type Admin? ", issa instanceof Admin);





