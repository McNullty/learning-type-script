describe('Basic Types examples', function() {
    it('Boolean type', function () {
        let isDone:boolean  = false;

        expect(isDone).toBeFalsy();
    });

    it('Number type', function () {
        let decimal: number = 6;
        let hex: number = 0xf00d;
        let binary: number = 0b1010;
        let octal: number = 0o744;

        expect(decimal).toBe(6);
        expect(hex).toBe(61453);
        expect(binary).toBe(10);
        expect(octal).toBe(484);
    });
})