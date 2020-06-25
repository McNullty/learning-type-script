describe('Examples for functions', () => {
    it('Named vs anonymous functions', () => {
        // Named function
        function add(x: number, y: number): number {
            return x + y;
        }

        // Anonymous function
        let myAdd = function (x: number, y: number): number {
            return x + y;
        };

        expect(add(1, 2)).toBe(3);
        expect(myAdd(3, 4)).toBe(7);
    });

    it('Capturing variable out of function', () => {
        let z = 100;

        function addToZ(x: number, y: number): number {
            return x + y + z;
        }

        expect(addToZ(1, 2)).toBe(103);
    });

    it('Writing the function type', () => {
        let myAdd: (baseValue: number, increment: number) => number =
            function (x: number, y: number): number {
                return x + y;
            };

        expect(myAdd(3, 4)).toBe(7);
    });

    it('Optional and Default Parameters ', () => {
        function buildName(firstName: string, lastName?: string) {
            if (lastName)
                return firstName + " " + lastName;
            else
                return firstName;
        }

        // Any optional parameters must follow required parameters.

        expect(buildName("Bob")).toBe("Bob");
        expect(buildName("Bob", "Adams")).toBe("Bob Adams");

        function buildName2(firstName: string, lastName: string = "Smith") {
            return firstName + " " + lastName;
        }

        expect(buildName2("Bob")).toBe("Bob Smith");
        expect(buildName2("Bob", "Adams")).toBe("Bob Adams");

        // Default-initialized parameters that come after all required parameters are treated as optional
    });

    it('Default parameter before mandatory parameter', () => {
        function buildName(firstName = "Will", lastName: string) {
            return firstName + " " + lastName;
        }

        expect(buildName("Bob", "Adams")).toBe("Bob Adams");
        expect(buildName(undefined, "Adams")).toBe("Will Adams");
    });

    it('Rest Parameters', () => {
        function buildName(firstName: string, ...restOfName: string[]) {
            return firstName + " " + restOfName.join(" ");
        }

        expect(buildName("Joseph", "Samuel", "Lucas", "MacKinzie"))
            .toBe("Joseph Samuel Lucas MacKinzie");
    });

    it('this and arrow functions', () => {
        let deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            createCardPicker: function() {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {suit: this.suits[pickedSuit], card: pickedCard % 13};
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        let result = "card: " + pickedCard.card + " of " + pickedCard.suit;
        console.log(result);
        expect(result).not.toBeNull();
    });

    it('this parameters', () => {
        interface Card {
            suit: string;
            card: number;
        }
        interface Deck {
            suits: string[];
            cards: number[];
            createCardPicker(this: Deck): () => Card;
        }
        let deck: Deck = {
            suits: ["hearts", "spades", "clubs", "diamonds"],
            cards: Array(52),
            // NOTE: The function now explicitly specifies that its callee must be of type Deck
            createCardPicker: function(this: Deck) {
                return () => {
                    let pickedCard = Math.floor(Math.random() * 52);
                    let pickedSuit = Math.floor(pickedCard / 13);

                    return {suit: this.suits[pickedSuit], card: pickedCard % 13};
                }
            }
        }

        let cardPicker = deck.createCardPicker();
        let pickedCard = cardPicker();

        let result = "card: " + pickedCard.card + " of " + pickedCard.suit;
        console.log(result);
        expect(result).not.toBeNull();
    });

    it('Function returning two different things based on what the user has passed in.', () => {
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        // @ts-ignore
        function pickCard(x): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
    });

    it('Function returning two different things based on what the user has passed in. (2)', () => {
        let suits = ["hearts", "spades", "clubs", "diamonds"];

        function pickCard(x: {suit: string; card: number; }[]): number;
        function pickCard(x: number): {suit: string; card: number; };
        function pickCard(x: any): any {
            // Check to see if we're working with an object/array
            // if so, they gave us the deck and we'll pick the card
            if (typeof x == "object") {
                let pickedCard = Math.floor(Math.random() * x.length);
                return pickedCard;
            }
            // Otherwise just let them pick the card
            else if (typeof x == "number") {
                let pickedSuit = Math.floor(x / 13);
                return { suit: suits[pickedSuit], card: x % 13 };
            }
        }

        let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
        let pickedCard1 = myDeck[pickCard(myDeck)];
        console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

        let pickedCard2 = pickCard(15);
        console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);

        //In order for the compiler to pick the correct type check, it follows a similar process to the underlying
        // JavaScript. It looks at the overload list and, proceeding with the first overload, attempts to call the
        // function with the provided parameters. If it finds a match, it picks this overload as the correct overload.
        // For this reason, it’s customary to order overloads from most specific to least specific.

        // TypeScript is not allowing string because pickCard() has only two overloads, object and number
        // let pickedCard3 = pickCard("test");
    });
})