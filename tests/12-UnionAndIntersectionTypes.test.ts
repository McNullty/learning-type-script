describe('Examples for union and intersection types', () => {
    it('Union type', () => {
        /**
         * Takes a string and adds "padding" to the left.
         * If 'padding' is a string, then 'padding' is appended to the left side.
         * If 'padding' is a number, then that number of spaces is added to the left side.
         */
        function padLeft(value: string, padding: string | number) {
            if (typeof padding === "number") {
                return Array(padding + 1).join(" ") + value;
            }
            if (typeof padding === "string") {
                return padding + value;
            }
            throw new Error(`Expected string or number, got '${padding}'.`);
        }

        expect(padLeft("Hello world", 4)).toBe("    Hello world");
        // not allowed
        // let indentedString = padLeft("Hello world", true);
    });

    it('Unions with Common Fields', () => {
        // If we have a value that is a union type, we can only access members that are common to all types in the
        // union.
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

        // Only available in one of the two possible types
//         pet.swim();
    });

    it('Discriminating Unions', () => {
            type NetworkLoadingState = {
                state: "loading";
            };

            type NetworkFailedState = {
                state: "failed";
                code: number;
            };

            type NetworkSuccessState = {
                state: "success";
                response: {
                    title: string;
                    duration: number;
                    summary: string;
                };
            };

            // Create a type which represents only one of the above types
            // but you aren't sure which it is yet.
            type NetworkState =
                | NetworkLoadingState
                | NetworkFailedState
                | NetworkSuccessState;

            function networkStatus(state: NetworkState): string {
                // Right now TypeScript does not know which of the three
                // potential types state could be.


                // By switching on state, TypeScript can narrow the union
                // down in code flow analysis
                switch (state.state) {
                    case "loading":
                        return "Downloading...";
                    case "failed":
                        // The type must be NetworkFailedState here,
                        // so accessing the `code` field is safe
                        return `Error ${state.code} downloading`;
                    case "success":
                        return `Downloaded ${state.response.title} - ${state.response.summary}`;
                }
            }

            expect(networkStatus({state: "loading"})).toBe("Downloading...");
        }
    );

    it('Intersection Types', () => {
        interface ErrorHandling {
            success: boolean;
            error?: { message: string };
        }

        interface ArtworksData {
            artworks: { title: string }[];
        }

        interface ArtistsData {
            artists: { name: string }[];
        }

        // These interfaces are composed to have
        // consistent error handling, and their own data.

        type ArtworksResponse = ArtworksData & ErrorHandling;
        type ArtistsResponse = ArtistsData & ErrorHandling;

        const handleArtistsResponse = (response: ArtistsResponse) => {
            if (response.error) {
                console.error(response.error.message);
                return;
            }

            console.log(response.artists);
        };

        handleArtistsResponse({artists: [{name: "test"}], success: true});

    });

    it('Mixins via Intersections', () => {
        class Person {
            constructor(public name: string) {}
        }

        interface Loggable {
            log(name: string): void;
        }

        class ConsoleLogger implements Loggable {
            log(name: string) {
                console.log(`Hello, I'm ${name}.`);
            }
        }

        // Takes two objects and merges them together
        function extend<First extends {}, Second extends {}>(
            first: First,
            second: Second
        ): First & Second {
            const result: Partial<First & Second> = {};
            for (const prop in first) {
                if (first.hasOwnProperty(prop)) {
                    (result as First)[prop] = first[prop];
                }
            }
            for (const prop in second) {
                if (second.hasOwnProperty(prop)) {
                    (result as Second)[prop] = second[prop];
                }
            }
            return result as First & Second;
        }

        const jim = extend(new Person("Jim"), ConsoleLogger.prototype);
        // jim.log(jim.name);
        // TODO: this is not working as expected
    });
})