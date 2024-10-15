import { Weapon } from '../model/weapon';

describe('Weapon', () => {
    let weapon: Weapon;

    beforeEach(() => {
        weapon = new Weapon({
            name: 'Sword of Valor',
            type: 'Melee',
            damage: 50,
            quality: 80
        });
    });

    it('should create a weapon with correct properties', () => {
        expect(weapon.name).toBe('Sword of Valor');
        expect(weapon.type).toBe('Melee');
        expect(weapon.damage).toBe(50);
        expect(weapon.quality).toBe(80);
    });

    it('should return true for equal weapons', () => {
        const other = new Weapon({
            name: 'Sword of Valor',
            type: 'Melee',
            damage: 50,
            quality: 80
        });

        expect(weapon.equals(other)).toBe(true);
    });

    it('should return false for unequal weapons', () => {
        const other = new Weapon({
            name: 'Axe of Fury',
            type: 'Axe',
            damage: 70,
            quality: 90
        });

        expect(weapon.equals(other)).toBe(false);
    });
});
