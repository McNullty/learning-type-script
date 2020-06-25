describe('Examples for Classes', () => {
    it('Class implementation with method', () => {
        interface ClockInterface {
            currentTime: Date;
            setTime(d: Date): void;
        }

        class Clock implements ClockInterface {
            currentTime: Date = new Date();
            setTime(d: Date) {
                this.currentTime = d;
            }
            constructor(h: number, m: number) { }
        }

        let c = new Clock(1, 2);

        expect(c.currentTime).not.toBeNull();
    });

    it('Difference between the static and instance sides of classes', () => {
        interface ClockConstructor {
            new (hour: number, minute: number): ClockInterface;
        }
        interface ClockInterface {
            tick(): string;
        }

        function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
            return new ctor(hour, minute);
        }

        class DigitalClock implements ClockInterface {
            constructor(h: number, m: number) { }
            tick() {
                return "beep beep";
            }
        }
        class AnalogClock implements ClockInterface {
            constructor(h: number, m: number) { }
            tick() {
                return "tick tock";
            }
        }

        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);

        expect(digital.tick()).toBe("beep beep")
        expect(analog.tick()).toBe("tick tock")
    });

    it('Another simple way is to use class expressions', () => {
        interface ClockConstructor2 {
            new (hour: number, minute: number): ClockInterface2;
        }

        interface ClockInterface2 {
            tick(): string;
        }

        const Clock: ClockConstructor2 = class Clock implements ClockInterface2 {
            constructor(h: number, m: number) {}
            tick() {
                return "beep beep";
            }
        }

        let x = new Clock(1, 2);
        expect(x.tick()).toBe("beep beep")
    });

    it('Simple class-based example', () => {
        class Greeter {
            greeting: string;
            constructor(message: string) {
                this.greeting = message;
            }
            greet() {
                return "Hello, " + this.greeting;
            }
        }

        let greeter = new Greeter("world");

        expect(greeter.greet()).toBe("Hello, world");
    });

    it('Inheritance example', () => {
        class Animal {
            move(distanceInMeters: number = 0) {
                return `Animal moved ${distanceInMeters}m.`;
            }
        }

        class Dog extends Animal {
            bark() {
                return 'Woof! Woof!';
            }
        }

        const dog = new Dog();
        dog.bark();
        dog.move(10);
        dog.bark();

        expect(dog.bark()).toBe("Woof! Woof!");
        expect(dog.move(10)).toBe("Animal moved 10m.");
    });

    it('Complex example', () => {
        class Animal {
            name: string;
            constructor(theName: string) { this.name = theName; }
            move(distanceInMeters: number = 0) {
                return `${this.name} moved ${distanceInMeters}m.`;
            }
        }

        class Snake extends Animal {
            constructor(name: string) { super(name); }
            move(distanceInMeters = 5) {
                return "Slithering..." + super.move(distanceInMeters);
            }
        }

        class Horse extends Animal {
            constructor(name: string) { super(name); }
            move(distanceInMeters = 45) {
                return "Galloping..." + super.move(distanceInMeters);
            }
        }

        let sam = new Snake("Sammy the Python");
        let tom: Animal = new Horse("Tommy the Palomino");

        expect(sam.move()).toBe("Slithering...Sammy the Python moved 5m.");
        expect(sam.name).toBe("Sammy the Python");
        expect(tom.move(34)).toBe("Galloping...Tommy the Palomino moved 34m.");
        expect(tom.name).toBe("Tommy the Palomino");
    });

    it('Public by default example', () => {
        // In TypeScript, each member is public by default.

        class Animal {
            public name: string;
            public constructor(theName: string) { this.name = theName; }
            public move(distanceInMeters: number) {
                console.log(`${this.name} moved ${distanceInMeters}m.`);
            }
        }
    });

    it('Private fields (ECMAScript)', () => {
        class Animal {
            #name: string;
            constructor(theName: string) { this.#name = theName; }
        }

        //new Animal("Cat").#name; // Property '#name' is not accessible outside class 'Animal' because it has a
        // private identifier.
    });

    it('Private fields (TypeScript)', () => {
        class Animal {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }

        //new Animal("Cat").name; // Property '#name' is not accessible outside class 'Animal' because it has a
        // private identifier.
    });

    it('Assigning classes', () => {
        class Animal {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }

        class Rhino extends Animal {
            constructor() { super("Rhino"); }
        }

        class Employee {
            private name: string;
            constructor(theName: string) { this.name = theName; }
        }

        let animal = new Animal("Goat");
        let rhino = new Rhino();
        let employee = new Employee("Bob");

        animal = rhino;
        // animal = employee; // Error: 'Animal' and 'Employee' are not compatible
    });

    it('Understanding protected', () => {
        class Person {
            protected name: string;
            constructor(name: string) { this.name = name; }
        }

        class Employee extends Person {
            private readonly department: string;

            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }

        let howard = new Employee("Howard", "Sales");
        expect(howard.getElevatorPitch()).toBe("Hello, my name is Howard and I work in Sales.");
        //console.log(howard.name); // error
    });

    it('Protected constructor', () => {
        class Person {
            protected name: string;
            protected constructor(theName: string) { this.name = theName; }
        }

        // Employee can extend Person
        class Employee extends Person {
            private readonly department: string;

            constructor(name: string, department: string) {
                super(name);
                this.department = department;
            }

            public getElevatorPitch() {
                return `Hello, my name is ${this.name} and I work in ${this.department}.`;
            }
        }

        let howard = new Employee("Howard", "Sales");
        expect(howard).not.toBeNull();
        // let john = new Person("John"); // Error: The 'Person' constructor is protected
    });

    it('Readonly properties', () => {
        //Readonly properties must be initialized at their declaration or in the constructor.
        class Octopus {
            readonly name: string;
            readonly numberOfLegs: number = 8;
            constructor (theName: string) {
                this.name = theName;
            }
        }
        let dad = new Octopus("Man with the 8 strong legs");
        expect(dad.name).toBe("Man with the 8 strong legs")
        expect(dad.numberOfLegs).toBe(8)
        // dad.name = "Man with the 3-piece suit"; // error! name is readonly.
    });

    it('Parameter properties', () => {
        class Octopus {
            readonly numberOfLegs: number = 8;
            constructor(readonly name: string) {
            }
        }
        let dad = new Octopus("Man with the 8 strong legs");
        expect(dad.name).toBe("Man with the 8 strong legs")
        expect(dad.numberOfLegs).toBe(8)
        // dad.name = "Man with the 3-piece suit"; // error! name is readonly.
    });

    it('Accessors example', () => {
        const fullNameMaxLength = 10;

        class Employee {
            // @ts-ignore
            private _fullName: string;

            get fullName(): string {
                return this._fullName;
            }

            set fullName(newName: string) {
                if (newName && newName.length > fullNameMaxLength) {
                    throw new Error("fullName has a max length of " + fullNameMaxLength);
                }

                this._fullName = newName;
            }
        }

        let employee = new Employee();
        employee.fullName = "Bob Smith";

        expect(employee.fullName).toBe("Bob Smith");
        expect(() => {employee.fullName = "Bob Smithsonian"}).toThrow(Error);
    });

    it('Static Properties', () => {
        class Grid {
            static origin = {x: 0, y: 0};
            calculateDistanceFromOrigin(point: {x: number; y: number;}) {
                let xDist = (point.x - Grid.origin.x);
                let yDist = (point.y - Grid.origin.y);
                return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
            }
            constructor (public scale: number) { }
        }

        let grid1 = new Grid(1.0);  // 1x scale
        let grid2 = new Grid(5.0);  // 5x scale

        expect(grid1.calculateDistanceFromOrigin({x: 10, y: 10})).toBe(14.142135623730951);
        expect(grid2.calculateDistanceFromOrigin({x: 10, y: 10})).toBe(2.8284271247461903);
    });

    it('Abstract class', () => {
        abstract class Department {

            protected constructor(public name: string) {
            }

            printName(): string {
               return "Department name: " + this.name;
            }

            abstract printMeeting(): string; // must be implemented in derived classes
        }

        class AccountingDepartment extends Department {

            constructor() {
                super("Accounting and Auditing"); // constructors in derived classes must call super()
            }

            printMeeting(): string {
                return "The Accounting Department meets each Monday at 10am.";
            }

            generateReports(): string {
               return "Generating accounting reports...";
            }
        }

        let department: Department; // ok to create a reference to an abstract type
        // department = new Department(); // error: cannot create an instance of an abstract class
        department = new AccountingDepartment(); // ok to create and assign a non-abstract subclass
        expect(department.printName()).toBe("Department name: Accounting and Auditing");
        expect(department.printMeeting()).toBe("The Accounting Department meets each Monday at 10am.");

        let accountingDepartment = new AccountingDepartment()
        expect(accountingDepartment.generateReports()).toBe("Generating accounting reports...");
        // department.generateReports(); // error: method doesn't exist on declared abstract type
    });

    it('Constructor functions', () => {
        class Greeter {
            static standardGreeting = "Hello, there";
            // @ts-ignore
            greeting: string;
            greet() {
                if (this.greeting) {
                    return "Hello, " + this.greeting;
                }
                else {
                    return Greeter.standardGreeting;
                }
            }
        }

        let greeter1: Greeter;
        greeter1 = new Greeter();
        expect(greeter1.greet()).toBe("Hello, there");
        let greeterMaker: typeof Greeter = Greeter;

        greeterMaker.standardGreeting = "Hey there!";
        let greeter2: Greeter = new greeterMaker();

        console.log(greeter2.greet()); // "Hey there!"
        expect(greeter2.greet()).toBe("Hey there!");

        expect(greeter1.greet()).toBe("Hey there!");
    });
})
