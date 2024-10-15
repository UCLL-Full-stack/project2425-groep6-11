import { Character } from '../model/character';
import {Mount} from "../model/mount";
import {Quest} from "../model/quest";
import {Weapon} from "../model/weapon";


describe('Character', () => {
    let character: Character;
    let mount: Mount;
    let weapons: Weapon[];
    let quests: Quest[];

    beforeEach(() => {
        mount = new Mount({ name: 'Dragon', speed: 100 });

        weapons = [
            new Weapon({ name: 'Longsword', type: 'Melee', damage: 20, quality: 98 }),
            new Weapon({ name: 'Bow', type: 'Ranged', damage: 12, quality: 79 })
        ];

        quests = [
            new Quest({ xp: 200, title: 'Save the kingdom', description: 'Bring back the princess and save the kingdom!'}),
            new Quest({ xp: 15, title: 'Pick 5 mushrooms', description: 'Pick 5 mushrooms and bring them back to the tavern!'})];

        character = new Character({
            name: 'Maenoir',
            class: 'Death blade',
            level: 12,
            power: 36,
            mana: 100,
            health: 100,
            defense: 50,
            mount: mount,
            weapons: weapons,
            quests: quests
        });
    });

    it('should create a character with the corresponding properties', () => {
        expect(character.name).toEqual('Maenoir');
        expect(character.class).toEqual('Death blade');
        expect(character.level).toEqual(12);
        expect(character.power).toEqual(36);
        expect(character.mana).toEqual(100);
        expect(character.health).toEqual(100);
        expect(character.defense).toEqual(50);
        expect(character.mount).toBe(mount);
        expect(character.weapons).toHaveLength(2);
        expect(character.quests).toHaveLength(2);
    });

    it('should allow updating character properties', () => {
        character.name = 'Akinoir';
        character.class = 'Soul eater';
        character.level = 13;
        character.power = 40;
        character.mana = 120;
        character.health = 120;
        character.defense = 30;

        expect(character.name).toEqual('Akinoir');
        expect(character.class).toEqual('Soul eater');
        expect(character.level).toEqual(13);
        expect(character.power).toEqual(40);
        expect(character.mana).toEqual(120);
        expect(character.health).toEqual(120);
        expect(character.defense).toEqual(30);
    });

    it('should allow adding weapons to the character', () => {
        const newWeapon = new Weapon({ name: 'Axe', type: 'Melee', damage: 30, quality: 91 });
        character.addWeapon(newWeapon);

        expect(character.weapons).toHaveLength(3);
        expect(character.weapons[2]).toBe(newWeapon);
    });

    it('should allow adding quests to the character', () => {
        const newQuest = new Quest({ xp: 150, title: 'Slay the god dragon', description: 'Slay the god dragon and come home with its loot!'});
        character.addQuest(newQuest);

        expect(character.quests).toHaveLength(3);
        expect(character.quests[2]).toBe(newQuest);
    });

    it('should return true for equal characters', () => {
        const other = new Character({
            name: 'Maenoir',
            class: 'Death blade',
            level: 12,
            power: 36,
            mana: 100,
            health: 100,
            defense: 50,
            mount: mount,
            weapons: weapons,
            quests: quests
        });

        expect(character.equals(other)).toBe(true);
    });

    it('should return false for unequal characters', () => {
        const other = new Character({
            name: 'Akinoir',
            class: 'Death blade',
            level: 12,
            power: 36,
            mana: 100,
            health: 100,
            defense: 50,
            mount: mount,
            weapons: weapons,
            quests: quests
        });

        expect(character.equals(other)).toBe(false);
    });
})