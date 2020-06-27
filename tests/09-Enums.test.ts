describe('Examples for Enums', () => {
    it('Using enums', () => {
        enum Response {
            No = 0,
            Yes = 1,
        }

        function respond(recipient: string, message: Response): string {
            if(message === Response.No) {
                return "Nop"
            }
            return "Yup"
        }

        expect(respond("Princess Caroline", Response.Yes)).toBe("Yup");
    });

    it('String enums', () => {
        enum Direction {
            Up = "UP",
            Down = "DOWN",
            Left = "LEFT",
            Right = "RIGHT",
        }

        function respond(direction: Direction): string {
            return direction.valueOf();
        }

        expect(respond(Direction.Right)).toBe("RIGHT");
    });

    it('Heterogeneous enums', () => {
        // Don't do this!!
        enum BooleanLikeHeterogeneousEnum {
            No = 0,
            Yes = "YES",
        }

        function process(input: BooleanLikeHeterogeneousEnum): string {
            if(input === BooleanLikeHeterogeneousEnum.No){
                return "Nop";
            }
            return "Yup";
        }

        expect(process(BooleanLikeHeterogeneousEnum.Yes)).toBe("Yup");
        expect(process(BooleanLikeHeterogeneousEnum.No)).toBe("Nop");

    });

    it('Computed and constant members', () => {
        enum FileAccess {
            // constant members
            None,
            Read    = 1 << 1,
            Write   = 1 << 2,
            ReadWrite  = Read | Write,
            // computed member
            G = "123".length
        }
    });

    it('Union enums and enum member types', () => {
        // When all members in an enum have literal enum values, enum members also become types as well
        enum ShapeKind {
            Circle,
            Square,
        }

        interface Circle {
            kind: ShapeKind.Circle;
            radius: number;
        }

        interface Square {
            kind: ShapeKind.Square;
            sideLength: number;
        }

        let c: Circle = {
            kind: ShapeKind.Circle,
            radius: 100,
        }

        expect(c.kind).toBe(ShapeKind.Circle);
    });

    it('Union enums and enum member types (2)', () => {
        // When all members in an enum have literal enum values, enum types themselves effectively become a union
        // of each enum member
        enum E {
            Foo,
            Bar,
        }

        function f(x: E) {
            // @ts-ignore
            if (x !== E.Foo || x !== E.Bar) {
                //             ~~~~~~~~~~~
                // Error! This condition will always return 'true' since the types 'E.Foo' and 'E.Bar' have no overlap.
            }
        }
    });

    it('Enums are real objects that exist at runtime', () => {
        enum E {
            X, Y, Z
        }
        function f(obj: { X: number }) {
            return obj.X;
        }

        // Works, since 'E' has a property named 'X' which is a number.
        expect(f(E)).toBe(0);
    });

    it('keyof keyword works differently than you might expect for typical objects', () => {
        enum LogLevel {
            ERROR, WARN, INFO, DEBUG
        }

        /**
         * This is equivalent to:
         * type LogLevelStrings = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG';
         */
        type LogLevelStrings = keyof typeof LogLevel;

        function printImportant(key: LogLevelStrings, message: string) {
            const num = LogLevel[key];
            if (num <= LogLevel.WARN) {
                console.log('Log level key is: ', key);
                console.log('Log level value is: ', num);
                console.log('Log level message is: ', message);
            }
        }
        printImportant('ERROR', 'This is a message');
        printImportant('INFO', 'This is a second message');
    });

    it('Reverse mappings', () => {
        enum Enum {
            A
        }
        let a = Enum.A;
        let nameOfA = Enum[a]; // "A"

        expect(nameOfA).toBe("A")
        expect(a).toBe(0);

        // Keep in mind that string enum members do not get a reverse mapping generated at all.
    });

    it('const enums', () => {
        // Const enums can only use constant enum expressions and unlike regular enums they are completely removed
        // during compilation. Const enum members are inlined at use sites.

        const enum Enum {
            A = 1,
            B = A * 2
        }

        const enum Directions {
            Up,
            Down,
            Left,
            Right
        }

        let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right]
    });

    it('Ambient enums', () => {
        // One important difference between ambient and non-ambient enums is that, in regular enums, members that don’t
        // have an initializer will be considered constant if its preceding enum member is considered constant. In
        // contrast, an ambient (and non-const) enum member that does not have initializer is always considered
        // computed.

        // @ts-ignore
        declare enum Enum {
            A = 1,
            B,
            C = 2
        }

    });
})