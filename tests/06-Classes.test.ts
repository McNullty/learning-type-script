describe('Examples for Classes', () => {
    it('Class implementation with method', () => {
        interface ClockInterface {
            currentTime: Date;
            setTime(d: Date): void;
        }

        class Clock implements ClockInterface {
            currentTime: Date = new Date();
            setTime(d: Date) {
                this.currentTime = d;
            }
            constructor(h: number, m: number) { }
        }

        let c = new Clock(1, 2);

        expect(c.currentTime).not.toBeNull();
    });

    it('Difference between the static and instance sides of classes', () => {
        interface ClockConstructor {
            new (hour: number, minute: number): ClockInterface;
        }
        interface ClockInterface {
            tick(): string;
        }

        function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
            return new ctor(hour, minute);
        }

        class DigitalClock implements ClockInterface {
            constructor(h: number, m: number) { }
            tick() {
                return "beep beep";
            }
        }
        class AnalogClock implements ClockInterface {
            constructor(h: number, m: number) { }
            tick() {
                return "tick tock";
            }
        }

        let digital = createClock(DigitalClock, 12, 17);
        let analog = createClock(AnalogClock, 7, 32);

        expect(digital.tick()).toBe("beep beep")
        expect(analog.tick()).toBe("tick tock")
    });

    it('Another simple way is to use class expressions', () => {
        interface ClockConstructor2 {
            new (hour: number, minute: number): ClockInterface2;
        }

        interface ClockInterface2 {
            tick(): string;
        }

        const Clock: ClockConstructor2 = class Clock implements ClockInterface2 {
            constructor(h: number, m: number) {}
            tick() {
                return "beep beep";
            }
        }

        let x = new Clock(1, 2);
        expect(x.tick()).toBe("beep beep")
    });
})