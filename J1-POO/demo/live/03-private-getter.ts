// 03 private, getter, validation, #privé

class Thermostat {
    constructor(private temperature: number){}

    // getter "méthode" (support officiel)
    getTemperature(): number {
        return this.temperature;
    }

    // get "accesseur": s'utilise ici SANS parenthèses
    get fahrenheit(): number {
        return this.temperature * 1.8 + 32; 
    }

    // on ne modifie pas en direct: on passe par une méthode qui VERIFIE
    check(newTemperature: number): void {
        if(newTemperature < 5 || newTemperature > 30){
            throw new Error(`Refusé: ${newTemperature}°C en dehors de [5,30]`)
        }
        this.temperature = newTemperature;
    }

}


const t = new Thermostat(19);
console.log("1. getTemperature(): ", t.getTemperature(), " / accesseur fahrenheit :", t.fahrenheit);
// t.temperature = 99; // TS2341 : Property private

t.check(21);
console.log("2. Après le check(21) : ", t.getTemperature());

try {
    t.check(99);
    
} catch (error) {
    console.log("3. ", (error as Error).message);
    
}

(t as any).temperature = 99;
console.log("4. contourné avec mon 'as any' :", t.getTemperature());

// #champ = vrai privé en JS (même à la compilation runtime)
class Vault {
    #code = 1234;
    check(attempt: number): boolean {return attempt === this.#code}
}

const vault = new Vault();
console.log("5.  #code: ", (vault as any).code, "valeur :", vault, "/ check(1234):", vault.check(1234) );
