describe('Examples for Type Compatibility', () => {
    it('Simple example', () => {
        interface Named {
            name: string;
        }

        class Person {
            name: string = "";
        }

        let p: Named;
// OK, because of structural typing
        p = new Person();

        expect(p.name).toBe("");
    });

    it('example 1', () => {
        interface Named {
            name: string;
        }

        let x: Named;
// y's inferred type is { name: string; location: string; }
        let y = { name: "Alice", location: "Seattle" };
        x = y;

        expect(x.name).toBe("Alice");
        // Error because
        // expect(x.location).toBe("Seattle");
    });

    it('Comparing two functions', () => {
        let x = (a: number) => {
            return a
        };
        let y = (b: number, s: string) => {
            return b + s.length;
        };

        y = x; // OK
        // x = y; // Error

        expect(y(1, "s")).toBe(1)
        // The reason for this assignment to be allowed is that ignoring extra function parameters is actually quite
        // common in JavaScript.
    });

    it('Comparing two functions', () => {
        let x = () => ({name: "Alice"});
        let y = () => ({name: "Alice", location: "Seattle"});

        x = y; // OK
        // y = x; // Error, because x() lacks a location property
    });

    it('Function Parameter Bivariance', () => {
        enum EventType { Mouse, Keyboard }

        interface Event { timestamp: number; }
        interface MouseEvent extends Event { x: number; y: number }
        interface KeyEvent extends Event { keyCode: number }

        function listenEvent(eventType: EventType, handler: (n: Event) => void) {
            /* ... */
        }

// Unsound, but useful and common
        // @ts-ignore
        listenEvent(EventType.Mouse, (e: MouseEvent) => console.log(e.x + "," + e.y));

// Undesirable alternatives in presence of soundness
        listenEvent(EventType.Mouse, (e: Event) => console.log((e as MouseEvent).x + "," + (e as MouseEvent).y));
        listenEvent(EventType.Mouse, ((e: MouseEvent) => console.log(e.x + "," + e.y)) as (e: Event) => void);

// Still disallowed (clear error). Type safety enforced for wholly incompatible types
//         listenEvent(EventType.Mouse, (e: number) => console.log(e));
    });

    it('Optional Parameters and Rest Parameters', () => {
        // When comparing functions for compatibility, optional and required parameters are interchangeable. Extra
        // optional parameters of the source type are not an error, and optional parameters of the target type without
        // corresponding parameters in the source type are not an error.

        function invokeLater(args: any[], callback: (...args: any[]) => void) {
            /* ... Invoke callback with 'args' ... */
        }

// Unsound - invokeLater "might" provide any number of arguments
        invokeLater([1, 2], (x, y) => console.log(x + ", " + y));

// Confusing (x and y are actually required) and undiscoverable
        invokeLater([1, 2], (x?, y?) => console.log(x + ", " + y));
    });

    it('Enums are compatible with numbers, and numbers are compatible with enums', () => {
        enum Status { Ready, Waiting };
        enum Color { Red, Blue, Green };

        let status = Status.Ready;
        // Enum values from different enum types are considered incompatible.
        // status = Color.Green
    });

    it('Classes compatibility', () => {
        class Animal {
            feet: number;
            constructor(name: string, numFeet: number) { this.feet = numFeet; }
        }

        class Size {
            feet: number;
            constructor(numFeet: number) { this.feet = numFeet; }
        }

        let a: Animal;
        let s: Size;

        // @ts-ignore
        a = s;  // OK
        s = a;  // OK
    });
})