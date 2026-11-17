// S AVANT (violation) : une seule classe, mais TROIS personnes peuvent demander de la modifier.
type Note = { matiere: string; valeur: number };

function calculateAverage(notes: Note[]): number {
    const total = notes.reduce((somme, n) => somme + n.valeur, 0);
    return Math.round((total / notes.length) * 10) / 10;
}

class BulletinFormatter{
  formatter(student: string, average: number): string{

    return `Bulletin de ${student} : ${average}/20`;
  }

}

class BulletinRepository {
  save(student: string, average: number): void{
    console.log(`[BDD] INSERT INTO bulletins VALUES ('${student}', ${average})`);
  }

}

console.log('=== S APRES : 3 modules ===');
const notes: Note[] = [{matiere: "TS", valeur: 17}, {matiere: "React", valeur: 18}];
const moyenne = calculateAverage(notes);
console.log(new BulletinFormatter().formatter("Berancan", moyenne));
new BulletinRepository().save("Berancan", moyenne);
