import { Mount } from '../../domain/model/mount';

describe("Mount Domain Model", () => {
    let mount: Mount;

    beforeEach(() => {
        mount = new Mount({
            id: 1,
            name: "Horse",
            base: "Equine",
            speed: 30,
            can_fly: false,
            legs: 4,
            cost: 500,
        });
    });

    test("Mount initializes correctly", () => {
        expect(mount.name).toBe("Horse");
        expect(mount.speed).toBe(30);
        expect(mount.base).toBe("Equine");
        expect(mount.can_fly).toBe(false);
        expect(mount.legs).toBe(4);
        expect(mount.cost).toBe(500);
    });

    test("Mount name validation", () => {
        expect(() => {
            new Mount({
                name: "Ox",
                base: "Bovine",
                speed: 20,
                can_fly: false,
                legs: 4,
                cost: 400,
            });
        }).toThrow("Name must be more than 3 characters long");
    });

    test("Mount equality", () => {
        const identicalMount = new Mount({
            id: 1,
            name: "Horse",
            base: "Equine",
            speed: 30,
            can_fly: false,
            legs: 4,
            cost: 500,
        });

        expect(mount.equals(identicalMount)).toBe(true);
    });
});
