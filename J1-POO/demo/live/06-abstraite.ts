// 06 - Classe abstraite

class Point {
    constructor(public x: number, public y: number){}
}

abstract class Shape {
    constructor(public center: Point){}

    // Les enfants sont OBLIGES d'écrire ces méthodes
    abstract aire(): number;
    abstract perimetre(): number; 

    description(): string {
        return `${this.constructor.name} en (${this.center.x}, ${this.center.y}): aire ${this.aire().toFixed(2)},périmètre ${this.perimetre().toFixed(2)} `;
    }
}

class Circle extends Shape {

    constructor(center: Point, public radius: number){
        super(center);
    }

    aire(): number { 
        return Math.PI * this.radius ** 2
    }

    perimetre(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    constructor(center: Point, public length: number, public width: number){
        super(center)
    }

    aire(): number {return this.length * this.width};
    perimetre(): number {
        return 2 * (this.length + this.width);
    }
}

// const f = new Shape(new Point(0,0)); // on peut pas instancier

const shapes: Shape[] = [new Circle(new Point(0,0), 5), new Rectangle(new Point(-5, -3),5,10)];
shapes.forEach(s => console.log("-", s.description()));