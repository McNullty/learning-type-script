describe('Variable Declarations examples', () => {
    // Examples: https://www.typescriptlang.org/docs/handbook/variable-declarations.html
    it('template', () => {
        expect(1).toBeTruthy();
    });

    it('Shadowing example (1)', () => {
        function f(condition: boolean, x: number): number {
            if (condition) {
                let x = 100;
                return x;
            }

            return x;
        }

        expect(f(false, 0)).toBe(0);
        expect(f(true, 0)).toBe(100);
    });

    it('Shadowing example (2)', () => {
        // This version of the loop will actually perform the summation correctly because the inner loop’s i shadows i
        // from the outer loop.
        // But shadowing should usually be avoided in the interest of writing clearer code.
        function sumMatrix(matrix: number[][]) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                let currentRow = matrix[i];
                for (let i = 0; i < currentRow.length; i++) {
                    sum += currentRow[i];
                }
            }

            return sum;
        }

        expect(sumMatrix([[1, 2], [3, 4]])).toBe(10);
    });

    it('Block-scope capturing', () => {
        function theCityThatAlwaysSleeps() {
            let getCity;

            if (true) {
                let city = "Seattle";
                getCity = function () {
                    return city;
                }
            }

            return getCity();
        }

        expect(theCityThatAlwaysSleeps()).toBe("Seattle");
    });

    it('Const cant be reassign but it is not immutable', () => {
        // Unless you take specific measures to avoid it, the internal state of a const variable is still modifiable.
        // Fortunately, TypeScript allows you to specify that members of an object are readonly.
        const numLivesForCat = 9;
        const kitty = {
            name: "Aurora",
            numLives: numLivesForCat,
        }

        /*
                // Error
                kitty = {
                    name: "Danielle",
                    numLives: numLivesForCat
                };

         */

        kitty.name = "Rory";
        kitty.name = "Kitty";
        kitty.name = "Cat";
        kitty.numLives--;

        expect(kitty.numLives).toBe(8);
    });
})