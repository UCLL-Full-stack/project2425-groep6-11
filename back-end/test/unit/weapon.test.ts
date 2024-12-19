import { Weapon } from '../../domain/model/weapon';

describe("Weapon Domain Model", () => {
    let weapon: Weapon;

    beforeEach(() => {
        weapon = new Weapon({ id: 1, cost: 0, damage: 10, name: 'Blade1', quality: 100, type: 'Sword' });
    });

    test("Weapon initializes correctly", () => {
        expect(weapon.name).toBe("Blade1");
        expect(weapon.cost).toBe(0);
        expect(weapon.damage).toBe(10);
        expect(weapon.type).toBe('Sword');
        expect(weapon.quality).toBe(100);
    });

    test("Weapon name validation", () => {
        expect(() => {
            new Weapon({ id: 1, cost: 0, damage: 0, name: '', quality: 100, type: 'Sword' });
        }).toThrow("Name must be at least 3 characters long");
    });
});
