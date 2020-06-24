describe('Examples for Interfaces', () => {
    // The easiest way to remember whether to use readonly or const is to ask whether you’re using it on a variable or
    // a property. Variables use const whereas properties use readonly

    it('Simple example ', () => {
        function printLabel(labeledObj: { label: string }): string {
            return labeledObj.label;
        }

        let myObj = {size: 10, label: "Size 10 Object"};
        expect(printLabel(myObj)).toBe("Size 10 Object");

        // The printLabel function has a single parameter that requires that the object passed in has a property called
        // label of type string.
    });

    it('Simple example with interface', () => {
        interface LabeledValue {
            label: string;
        }

        function printLabel(labeledObj: LabeledValue): string {
            return labeledObj.label;
        }

        let myObj = {size: 10, label: "Size 10 Object"};
        expect(printLabel(myObj)).toBe("Size 10 Object");

        // It’s worth pointing out that the type checker does not require that these properties come in any sort of
        // order, only that the properties the interface requires are present and have the required type.
    });

    it('Optional properties', () => {
        interface SquareConfig {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig): { color: string; area: number } {
            let newSquare = {color: "white", area: 100};
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        let mySquare = createSquare({color: "black"});

        expect(mySquare).toStrictEqual({color: "black", area: 100});
        expect(createSquare({width: 5})).toStrictEqual({color: "white", area: 25});

        // Interface enforce property passed to function
        // expect(() => {createSquare({widt: 5})}).toThrow(Error);
    });

    it('Readonly properties', () => {
        interface Point {
            readonly x: number;
            readonly y: number;
        }

        let p1: Point = {x: 10, y: 20};

        expect(p1.x).toBe(10);

        // Error when reassigning
        // p1.x = 5; // error!
    });

    it('Readonly array', () => {
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;

        expect(ro).toStrictEqual([1, 2, 3, 4]);
        expect(a).toStrictEqual([1, 2, 3, 4]);
        // ro[0] = 12; // error!
        // ro.push(5); // error!
        // ro.length = 100; // error!

        // On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a
        // normal array is illegal.
        // a = ro; // error!

        // You can still override it with a type assertion, though:
        a = ro as number[];
        expect(a).toStrictEqual([1, 2, 3, 4]);
    });

    it('Excess Property Checks', () => {
        interface SquareConfig2 {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig2): { color: string; area: number } {
            let newSquare = {color: "white", area: 100};
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        // Adding property is not allowed
        // expect(createSquare({width: 100, opacity: 0.5})).toStrictEqual({color: "white", area: 25});
        expect(createSquare({width: 100, opacity: 0.5} as SquareConfig2))
            .toStrictEqual({color: "white", area: 10000});

    });

    it('Adding properties to interface', () => {
        interface SquareConfig2 {
            color?: string;
            width?: number;

            [propName: string]: any;
        }

        function createSquare2(config: SquareConfig2): { color: string; area: number } {
            let newSquare = {color: "white", area: 100};
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        // Adding property is not allowed
        // expect(createSquare({width: 100, opacity: 0.5})).toStrictEqual({color: "white", area: 25});
        expect(createSquare2({width: 100, opacity: 0.5}))
            .toStrictEqual({color: "white", area: 10000});

    });

    it('Excess Property Checks (2)', () => {
        interface SquareConfig3 {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig3): { color: string; area: number } {
            let newSquare = {color: "white", area: 100};
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return newSquare;
        }

        // Adding property is not allowed
        // expect(createSquare({width: 100, opacity: 0.5})).toStrictEqual({color: "white", area: 25});
        let squareOptions = {width: 100, opacity: 0.5};
        expect(createSquare(squareOptions))
            .toStrictEqual({color: "white", area: 10000});

        // The above workaround will work as long as you have a common property between squareOptions and SquareConfig3
    });

    it('Function types', () => {
        interface SearchFunc {
            (source: string, subString: string): boolean;
        }

        let mySearch: SearchFunc;
        mySearch = function (source: string, subString: string) {
            let result = source.search(subString);
            return result > -1;
        }

        expect(mySearch("test", "st")).toBeTruthy();
        expect(mySearch("test", "fst")).toBeFalsy();

        // For function types to correctly type check, the names of the parameters do not need to match.
        let mySearch2: SearchFunc;
        mySearch2 = function (src: string, sub: string): boolean {
            let result = src.search(sub);
            return result > -1;
        }

        expect(mySearch2("test", "st")).toBeTruthy();
        expect(mySearch2("test", "fst")).toBeFalsy();

        // If you do not want to specify types at all, TypeScript’s contextual typing can infer the argument types since
        // the function value is assigned directly to a variable of type SearchFunc
        let mySearch3: SearchFunc;
        mySearch3 = function (src, sub) {
            let result = src.search(sub);
            return result > -1;
        }

        expect(mySearch3("test", "st")).toBeTruthy();
        expect(mySearch3("test", "fst")).toBeFalsy();
    });

    it('Index-able Types', () => {
        interface StringArray {
            [index: number]: string;
        }

        let myArray: StringArray;
        myArray = ["Bob", "Fred"];

        expect(myArray[0]).toBe("Bob");
    });

    it('Extending interfaces ', () => {
        interface Shape {
            color: string;
        }

        interface Square extends Shape {
            sideLength: number;
        }

        let square = {} as Square;
        square.color = "blue";
        square.sideLength = 10;

        expect(square).toStrictEqual({color: "blue", sideLength: 10});
    });

    it('An interface can extend multiple interfaces', () => {
        interface Shape {
            color: string;
        }

        interface PenStroke {
            penWidth: number;
        }

        interface Square extends Shape, PenStroke {
            sideLength: number;
        }

        let square = {} as Square;
        square.color = "blue";
        square.sideLength = 10;
        square.penWidth = 5.0;

        expect(square).toStrictEqual({color: "blue", sideLength: 10, penWidth: 5.0});
    });

    it('Hybrid Types', () => {
        interface Counter {
            (start: number): string;

            interval: number;

            reset(): void;
        }

        function getCounter(): Counter {
            let counter = (function (start: number) {
            }) as Counter;
            counter.interval = 123;
            counter.reset = function () {
            };
            return counter;
        }

        let c = getCounter();
        c(10);
        c.reset();
        c.interval = 5.0;
    });

    it('Interfaces Extending Classes', () => {
        /*
        When an interface type extends a class type it inherits the members of the class but not their implementations.
        It is as if the interface had declared all of the members of the class without providing an implementation.
        Interfaces inherit even the private and protected members of a base class. This means that when you create an
        interface that extends a class with private or protected members, that interface type can only be implemented by
        that class or a subclass of it.

        This is useful when you have a large inheritance hierarchy, but want to specify that your code works with only
        subclasses that have certain properties. The subclasses don’t have to be related besides inheriting from the base
        class.
         */

        class Control {
            private state: any;
        }

        interface SelectableControl extends Control {
            select(): void;
        }

        class Button extends Control implements SelectableControl {
            select() { }
        }

        class TextBox extends Control {
            select() { }
        }

        // Error: Property 'state' is missing in type 'Image'.
        /*
        class Image implements SelectableControl {
            private state: any;
            select() { }
        }
        */

        class Location {

        }
    });
})