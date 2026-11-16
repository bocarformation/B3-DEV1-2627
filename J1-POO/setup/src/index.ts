class Student {
    constructor( public firstname: string) {}
}

const theBestStudent = new Student("Max");

console.log(`SETUP OK: Hello ${theBestStudent.firstname}`);
