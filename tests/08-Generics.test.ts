describe('Examples for generics', () => {
    it('Simple example', () => {
        function identity<T>(arg: T): T {
            return arg;
        }
        // Type declarations
        let myIdentity: <T>(arg: T) => T = identity;
        // Type doesn't have to match declared in function declaration.
        let myIdentity2: <U>(arg: U) => U = identity;
        // Or call signature of object literal type
        let myIdentity3: {<T>(arg: T): T} = identity;

        let output = identity<string>("myString");
        expect(output).toBe("myString");

        let secondOutput = identity("MySecondString")
        expect(secondOutput).toBe("MySecondString");
    });

    it('Example with arrays', () => {
        function loggingIdentity<T>(arg: T[]): T[] {
            console.log(arg.length);  // Array has a .length, so no more error
            return arg;
        }

        expect(loggingIdentity([1,2,3])).toStrictEqual([1,2,3]);

        // With Array type
        function loggingIdentity2<T>(arg: Array<T>): Array<T> {


            console.log(arg.length);  // Array has a .length, so no more error
            return arg;
        }
        expect(loggingIdentity2([1,2,3])).toStrictEqual([1,2,3]);
    });

    it('Generic types', () => {
        interface GenericIdentityFn {
            <T>(arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentityFn = identity;

        expect(myIdentity("myString")).toBe("myString");
    });

    it('Generic types (2)', () => {
        interface GenericIdentityFn<T> {
            (arg: T): T;
        }

        function identity<T>(arg: T): T {
            return arg;
        }

        let myIdentity: GenericIdentityFn<string> = identity;

        expect(myIdentity("myString")).toBe("myString");
    });

    it('Generic Classes', () => {
        class GenericNumber<T> {
            zeroValue: T | undefined;
            add: ((x: T, y: T) => T) | undefined;
        }

        let myGenericNumber = new GenericNumber<number>();
        myGenericNumber.zeroValue = 0;
        myGenericNumber.add = function(x, y) { return x + y; };
        expect(myGenericNumber.add(3, 4)).toBe(7);

        let stringNumeric = new GenericNumber<string>();
        stringNumeric.zeroValue = "";
        stringNumeric.add = function(x, y) { return x + y; };

        expect(stringNumeric.add(stringNumeric.zeroValue, "test")).toBe("test");

        //  Generic classes are only generic over their instance side rather than their static side, so when working
        //  with classes, static members can not use the class’s type parameter
    });

    it('Generic Constraints', () => {
        interface Lengthwise {
            length: number;
        }

        function loggingIdentity<T extends Lengthwise>(arg: T): number {
            return arg.length;
        }

        expect(loggingIdentity("test")).toBe(4);
        expect(loggingIdentity([1,2,3])).toBe(3);
    });

    it('Using Type Parameters in Generic Constraints', () => {
        function getProperty<T, K extends keyof T>(obj: T, key: K) {
            return obj[key];
        }

        let x = { a: 1, b: 2, c: 3, d: 4 };

        expect(getProperty(x, "a")).toBe(1);
        // getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
    });

    it('Using Class Types in Generics', () => {
        class BeeKeeper {
            // @ts-ignore
            hasMask: boolean;
        }

        class ZooKeeper {
            // @ts-ignore
            nametag: string;
        }

        class Animal {
            // @ts-ignore
            numLegs: number;
        }

        class Bee extends Animal {
            keeper: BeeKeeper = new BeeKeeper();
        }

        class Lion extends Animal {
            keeper: ZooKeeper = new ZooKeeper();
        }

        function createInstance<A extends Animal>(c: new () => A): A {
            return new c();
        }

        expect(createInstance(Lion).keeper.nametag).toBeUndefined();  // typechecks!
        expect(createInstance(Bee).keeper.hasMask).toBeUndefined();   // typechecks!
    });
})