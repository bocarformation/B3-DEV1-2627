// 01 - Types, inférence, any

let age = 19; // pas d'annotation ; TS INFERE: "number";

// age = "vingt";  // TS 2322: Type 'string' is not assignable... 

// age = age + 1;

// console.log(age);

function average(notes: number[]): number {
    return notes.reduce((sum, n) => sum + n, 0) / notes.length; 
}

console.log("Moyenne de 15, 20, 3: " + average([15,20,3]));

// JSON.parse renvoie "any" => TS arrête de vérifier
const raw = JSON.parse('{"x": 10, "y": 50}');
console.log("any: raw.z vaut", raw.z);
// console.log(raw.nimporteQuoi()); // TS ne dit rien; mais ça plante à l'exécution (TypeError)


// type Point = {x: number; y: number;};
const p: Point = JSON.parse('{"x": 10, "y": 50}');
console.log("Point typé: x + y =", p.x + p.y);
// p.nimporteQuoi(); // TS2339: Property 'nimportequoi' doesn't exist

// Piège: un type c'est une PROMESSE faite à TS, pas une vérification
const liar: Point = JSON.parse('{"x": "dix", "y": 50}');
console.log("liar.x = ", liar.x, "de type", typeof liar.x);

// Union 
function badge(id: number | string): string{
    return typeof id === "number" ? `#${id.toString()}` : `#${id.toUpperCase()}`
}

console.log("Union:", badge(7), badge("a7"));
