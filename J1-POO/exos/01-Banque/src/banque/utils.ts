export class Utils {
  /** Entier aléatoire entre min et max, les DEUX bornes INCLUSES. */
  static getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomDigits(length: number): string {
    return Array.from({length}, () => Utils.getRandomInt(0,9)).join("");
  }
}

// [0,4,2] => ce que fait la ligne 8 Array.from(); le join sert à "042";