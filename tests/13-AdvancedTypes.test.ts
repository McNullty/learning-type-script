describe('Examples for advanced types', () => {
    it('Type Guards and Differentiating Types', () => {
        interface Bird {
            fly(): void;

            layEggs(): void;
        }

        interface Fish {
            swim(): void;

            layEggs(): void;
        }

        // @ts-ignore
        function getSmallPet(): Fish | Bird {
            return {
                swim() {
                    console.log("swim");
                },
                layEggs() {
                    console.log("lay Eggs");
                }
            }
        }

        let pet = getSmallPet();
        pet.layEggs();

        // @ts-ignore
        if ((pet as Fish).swim) {
            (pet as Fish).swim();
        } else { // @ts-ignore
            if ((pet as Bird).fly) {
                        (pet as Bird).fly();
                    }
        }
    });
})