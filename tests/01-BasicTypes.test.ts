describe('Basic Types examples', () => {
    it('Boolean type initialization', () => {
        let isDone: boolean = false;

        expect(isDone).toBeFalsy();
    });

    it('Number type initialization', () => {
        let decimal: number = 6;
        let hex: number = 0xf00d;
        let binary: number = 0b1010;
        let octal: number = 0o744;

        expect(decimal).toBe(6);
        expect(hex).toBe(61453);
        expect(binary).toBe(10);
        expect(octal).toBe(484);
    });

    it('String type initialization', () => {
        let color: string = "blue";

        expect(color).toBe('blue');

        color = 'red';
        expect(color).toBe("red");
    });

    it('Template strings', () => {
        //These strings are surrounded by the backtick/backquote (`) character, and embedded
        // expressions are of the form ${ expr }

        let fullName: string = 'Bob Bobbington';
        let age: number = 37;
        let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

        let withoutTemplate: string = "Hello, my name is " + fullName + ".\n\n" +
            "I'll be " + (age + 1) + " years old next month.";

        expect(sentence).toBe(withoutTemplate);
    });

    it('Array', () => {
        let list: number[] = [1, 2, 3];
        let listGenericType: Array<number> = [1, 2, 3];

        expect(list).toMatchObject(listGenericType);
    });

    it('Tuple example', () => {
        // Tuple types allow you to express an array with a fixed number of elements whose types are known, but need not be the same.
        // Declare a tuple type
        let x: [string, number];
        // Initialize it
        x = ["hello", 10]; // OK

        // Initialize it incorrectly
        // x = [10, "hello"]; // Error

        expect(x[0].substring(1)).toBe("ello");
        expect(x[1]).toBe(10);
    });

    it('Enum example', () => {
        // By default enums index start with 0
        enum Color {Red, Green, Blue}

        let c: Color = Color.Green;
        expect(c).toBe(1);

        // You can set index of first element all other are incremented by one
        enum Color2 {Red = 1, Green, Blue}

        let c2: Color2 = Color2.Green;
        expect(c2).toBe(2);

        // You can manually set every value
        enum Color3 {Red = 1, Green = 2, Blue = 4}

        let c3: Color3 = Color3.Blue;
        expect(c3).toBe(4);

        // You can access enum name by index
        let c4: string = Color2[2];
        expect(c4).toBe('Green');
    });

    it('Any type examples', () => {
        let notSure: any = 4;
        expect(notSure).toBe(4);

        notSure = "maybe a string instead";
        expect(notSure.length).toBe(22);

        notSure = false;
        expect(notSure).toBeFalsy();
    });

    it('Any for handling arrays of unknown types', () => {
        let list: any[] = [1, true, "free"];
        expect(list[0]).toBe(1);
        expect(list[1]).toBeTruthy();
        expect(list[2]).toBe('free');

        list[1] = 100;
        expect(list[1]).toBe(100);
    });

    it('Null value', () => {
        let s: string | null = null;

        expect(s).toBeNull();

        s = 'Set';
        expect(s).not.toBeNull();
    });

    it('undefined value', () => {
        let s: string | undefined = undefined;

        expect(s).toBeUndefined();
        expect(s).not.toBeNull();

        s = 'Set';
        expect(s).not.toBeUndefined();
    });

    it('Never return type', () => {
        // The never type represents the type of values that never occur.
        function error(message: string): never {
            throw new Error(message);
        }

        expect(() => {
            error("Something failed")
        }).toThrow("Something failed");
    });

    it('Object example', () => {
        // object is a type that represents the non-primitive type, i.e. anything that is not number, string, boolean,
        // bigint, symbol, null, or undefined.

        function checkObject(o: object | null): string {
            if (o === null) {
                return "null";
            }
            return "object"
        }

        expect(checkObject({prop: 0})).toBe("object");
        expect(checkObject(null)).toBe("null");

        /*
        checkObject(42); // Error
        checkObject("string"); // Error
        checkObject(false); // Error
        checkObject(undefined); // Error
         */
    });

    it('Type assertions example', () => {
        // A type assertion is like a type cast in other languages, but performs no special checking or restructuring
        // of data. It has no runtime impact, and is used purely by the compiler. TypeScript assumes that you, the
        // programmer, have performed any special checks that you need.

        let someValue: any = "this is a string";

        let strLength: number = (<string>someValue).length;
        expect(strLength).toBe(16);

        // The two samples are equivalent. Using one over the other is mostly a choice of preference; however,
        // when using TypeScript with JSX, only as-style assertions are allowed.
        let strLength2: number = (someValue as string).length;
        expect(strLength2).toBe(16);
    });

    it('', () => {

    });
})