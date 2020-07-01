describe('Examples for symbols', () => {
    it('Symbols are immutable, and unique', () => {
        let sym2 = Symbol("key");
        let sym3 = Symbol("key");

        expect(sym2 === sym3).toBeFalsy();
    });

    it('Symbols could be used to declare object properties and class members', () => {
        const getClassNameSymbol = Symbol();

        class C {
            [getClassNameSymbol](){
                return "C";
            }
        }

        let c = new C();
        let className = c[getClassNameSymbol](); // "C"

        expect(className).toBe("C");
    });
})