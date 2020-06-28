describe('Examples for Literal Types', () => {
    it('String literal', () => {
        type Easing = "ease-in" | "ease-out" | "ease-in-out";

        class UIElement {
            animate(dx: number, dy: number, easing: Easing) {
                if (easing === "ease-in") {
                    // ...
                } else if (easing === "ease-out") {
                } else if (easing === "ease-in-out") {
                } else {
                    // It's possible that someone could reach this
                    // by ignoring your types though.
                }
            }
        }

        let button = new UIElement();
        button.animate(0, 0, "ease-in");
        // not allowed
        // button.animate(0, 0, "uneasy");
    });

    it('distinguish overloads', () => {
        function createElement(tagName: "img"): HTMLImageElement;
        function createElement(tagName: "input"): HTMLInputElement;
// ... more overloads ...
        function createElement(tagName: string): Element {
            // ... code goes here ...
            return new Element();
        }
    });
})