describe('Examples of spread', () => {
    it('Simple spread example', () => {
        let first = [1, 2];
        let second = [3, 4];
        let bothPlus = [0, ...first, ...second, 5];

        expect(bothPlus).toStrictEqual([0,1,2,3,4,5]);
    });

    it('Spread objects', () => {
        let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
        let search = { ...defaults, food: "rich" };

        expect(search).toStrictEqual({ food: "rich", price: "$$", ambiance: "noisy" });

        // Object spreading is more complex than array spreading. Like array spreading, it proceeds from left-to-right,
        // but the result is still an object. This means that properties that come later in the spread object overwrite
        // properties that come earlier. So if we modify the previous example to spread at the end:

        // @ts-ignore
        let search2 = { food: "rich", ...defaults };
        expect(search2).toStrictEqual({ food: "spicy", price: "$$", ambiance: "noisy" });
    });

    it('Spread removes methods from classes', () => {
        class C {
            p = 12;
            m() {
            }
        }
        let c = new C();
        let clone = { ...c };

        expect(clone.p).toBe(12);
        expect(() => {// @ts-ignore
            clone.m()}).toThrow(Error);
    });
})