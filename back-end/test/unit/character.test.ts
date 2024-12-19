import { Character } from '../../domain/model/character';
import { Weapon } from '../../domain/model/weapon';
import { Mount } from '../../domain/model/mount';
import { Quest } from '../../domain/model/quest';
import { Role, User } from '../../domain/model/user';

describe("Character Domain Model", () => {
        let weapon: Weapon,
            mount: Mount,
            quest: Quest,
            user: User,
            character: Character;

        beforeEach(() => {
                weapon = new Weapon({ id: 1, name: "Blade1", damage: 10, type: "sword", quality: 100, cost: 100 });
                mount = new Mount({ id: 1, name: "Horse", speed: 20, base: "hound", can_fly: false, cost: 100, legs: 2,  });
                quest = new Quest({ id: 1, description: 'This is my 1st quest', title: 'Quest1', xp: 0, reward: 100 });
                user = new User({ id: 1, username: "player1", email: 'player@test.com', password: 'Password1*', role: Role.Player });

                character = new Character({
                        id: 1,
                        name: "Hero",
                        role: "Warrior",
                        level: 5,
                        power: 100,
                        mana: 50,
                        health: 200,
                        defense: 30,
                        currency: 1000,
                        weapons: [weapon],
                        equipped: weapon,
                        mount: mount,
                        quests: [quest],
                        user: user,
                });
        });

        test("Character initializes correctly", () => {
                expect(character.name).toBe("Hero");
                expect(character.role).toBe("Warrior");
                expect(character.level).toBe(5);
                expect(character.power).toBe(100);
                expect(character.mana).toBe(50);
                expect(character.health).toBe(200);
                expect(character.defense).toBe(30);
                expect(character.currency).toBe(1000);
                expect(character.mount).toBe(mount);
                expect(character.weapons).toContain(weapon);
                expect(character.quests).toContain(quest);
                expect(character.equals(character)).toBe(true);
        });

        test("Character name validation", () => {
                expect(() => {
                        new Character({
                                name: "Al",
                                role: "Warrior",
                                level: 1,
                                power: 10,
                                mana: 5,
                                health: 50,
                                defense: 5,
                                currency: 100,
                                weapons: [],
                                quests: [],
                        });
                }).toThrow("Name must be at least 3 characters long");
        });

        test("Add weapon to character", () => {
                const newWeapon = new Weapon({ id: 2, name: "Blade2", damage: 10, type: "sword", quality: 100, cost: 100 });
                character.addWeapon(newWeapon);
                expect(character.weapons).toContain(newWeapon);
        });

        test("Add quest to character", () => {
                const newQuest = new Quest({ id: 2, description: 'This is my 2nd quest', title: 'Quest2', xp: 0, reward: 100 });
                character.addQuest(newQuest);
                expect(character.quests).toContain(newQuest);
        });
});
