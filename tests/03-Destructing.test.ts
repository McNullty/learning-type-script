describe('Examples of destructing', () => {
    it('Array destructing', () => {
        let input = [1, 2];
        let [first, second] = input;

        expect(first).toBe(1);
        expect(second).toBe(2);

        [first, second] = [second, first];

        expect(first).toBe(2);
        expect(second).toBe(1);
    });

    it('Parameter destructing', () => {
        function f([first, second]: [number, number]) {
            if (first > second) {
                return first;
            }
            return second;
        }

        expect(f([2,3])).toBe(3);
    });

    it('Remaining example', () => {
        let [first, ...rest] = [1, 2, 3, 4];

        expect(first).toBe(1);
        expect(rest).toStrictEqual([2, 3, 4]);
    });

    it('Ignoring other elements in destructing', () => {
        let [first] = [1, 2, 3, 4];
        expect(first).toBe(1);

        let [, second, , fourth] = [1, 2, 3, 4];
        expect(second).toBe(2);
        expect(fourth).toBe(4);
    });

    it('Tuple destructing', () => {
        let tuple: [number, string, boolean] = [7, "hello", true];

        let [a, b, c] = tuple;

        expect(a).toBe(7);
        expect(b).toBe("hello");
        expect(c).toBeTruthy();

        let [a1, ...bc] = tuple;
        expect(a1).toBe(7);
        expect(bc).toStrictEqual(["hello", true]);

        let [, b2] = tuple;
        expect(b2).toBe("hello");
    });

    it('Object destructing (1)', () => {
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };
        let { a, b } = o;

        expect(a).toBe("foo");
        expect(b).toBe(12);
        
    });

    it('Object destructing (2)', () => {
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };

        let { a, ...passThrough } = o;
        let total = passThrough.b + passThrough.c.length;

        expect(a).toBe("foo");
        expect(total).toBe(15);
    });

    it('Object destructing - Property renaming', () => {
        let o = {
            a: "foo",
            b: 12,
            c: "bar"
        };

        let { a: newName1, b: newName2 } = o;

        expect(newName1).toBe("foo");
        expect(newName2).toBe(12);
    });

    it('Object destructing - Default values', () => {
        function keepWholeObject(wholeObject: { a: string, b?: number }) {
            let { a, b = 1001 } = wholeObject;

            return b + a.length;
        }

        expect(keepWholeObject({a: "foo"})).toBe(1004);
        expect(keepWholeObject({a: "foo", b: 3})).toBe(6);
    });

    it('Destructing function declarations', () => {
        type C = { a: string, b?: number }
        function f({ a, b }: C): number {
            if(b === undefined) {
                return a.length;
            }
            return b + a.length;
        }

        expect(f({a: "foo", b: 12})).toBe(15);
    });

    it('Destructing function declarations (2)', () => {
        function f({ a="", b=0 } = {}): number {
            return b + a.length;
        }

        expect(f({a: "foo", b: 12})).toBe(15)
        expect(f({a: "foo"})).toBe(3)
        expect(f()).toBe(0)
    });
})