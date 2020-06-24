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

        function createSquare(config: SquareConfig): {color: string; area: number} {
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

        let p1: Point = { x: 10, y: 20 };

        expect(p1.x).toBe(10);

        // Error when reassigning
        // p1.x = 5; // error!
    });

    it('Readonly array', () => {
        let a: number[] = [1, 2, 3, 4];
        let ro: ReadonlyArray<number> = a;

        expect(ro).toStrictEqual([1,2,3,4]);
        expect(a).toStrictEqual([1,2,3,4]);
        // ro[0] = 12; // error!
        // ro.push(5); // error!
        // ro.length = 100; // error!

        // On the last line of the snippet you can see that even assigning the entire ReadonlyArray back to a
        // normal array is illegal.
        // a = ro; // error!

        // You can still override it with a type assertion, though:
        a = ro as number[];
        expect(a).toStrictEqual([1,2,3,4]);
    });

    it('Excess Property Checks', () => {
        interface SquareConfig2 {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig2): {color: string; area: number} {
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

        function createSquare2(config: SquareConfig2): {color: string; area: number} {
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

        function createSquare(config: SquareConfig3): {color: string; area: number} {
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
        mySearch = function(source: string, subString: string) {
            let result = source.search(subString);
            return result > -1;
        }

        expect(mySearch("test","st")).toBeTruthy();
        expect(mySearch("test","fst")).toBeFalsy();

        // For function types to correctly type check, the names of the parameters do not need to match.
        let mySearch2: SearchFunc;
        mySearch2 = function(src: string, sub: string): boolean {
            let result = src.search(sub);
            return result > -1;
        }

        expect(mySearch2("test","st")).toBeTruthy();
        expect(mySearch2("test","fst")).toBeFalsy();

        // If you do not want to specify types at all, TypeScript’s contextual typing can infer the argument types since
        // the function value is assigned directly to a variable of type SearchFunc
        let mySearch3: SearchFunc;
        mySearch3 = function(src, sub) {
            let result = src.search(sub);
            return result > -1;
        }

        expect(mySearch3("test","st")).toBeTruthy();
        expect(mySearch3("test","fst")).toBeFalsy();
    });

    it('Index-able Types', () => {
        interface StringArray {
            [index: number]: string;
        }

        let myArray: StringArray;
        myArray = ["Bob", "Fred"];

        expect(myArray[0]).toBe("Bob");
    });
})