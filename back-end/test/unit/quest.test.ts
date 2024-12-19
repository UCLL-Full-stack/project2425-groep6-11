import { Quest } from '../../domain/model/quest';

describe("Quest Domain Model", () => {
    let quest: Quest;

    beforeEach(() => {
        quest = new Quest({ id: 1, description: 'This is my 1st quest', title: 'Quest1', xp: 0, reward: 100 });
    });

    test("Quest initializes correctly", () => {
        expect(quest.title).toBe("Quest1");
        expect(quest.description).toBe("This is my 1st quest");
        expect(quest.xp).toBe(0);
        expect(quest.reward).toBe(100);
        expect(quest.completed).toBe(false);
    });

    test("Quest title validation", () => {
        expect(() => {
            quest = new Quest({ id: 1, description: 'This is my 1st quest', title: ' ', xp: 0, reward: 100 });
        }).toThrow("Title can't be empty");
    });

    test("Quest description validation", () => {
        expect(() => {
            quest = new Quest({ id: 1, description: ' ', title: 'Quest1', xp: 0, reward: 100 });
        }).toThrow("Description can't be empty");
    });

    test("Quest XP validation", () => {
        expect(() => {
            quest = new Quest({ id: 1, description: 'This is my 1st quest', title: 'Quest1', xp: -1, reward: 100 });
        }).toThrow("Quest XP must be more than 0");
    });

    test("Quest reward validation", () => {
        expect(() => {
            quest = new Quest({ id: 1, description: 'This is my 1st quest', title: 'Quest1', xp: 0, reward: -1 });
        }).toThrow("Quest reward must be more than 0");
    });

    test("Quest equality", () => {
        const identicalQuest = new Quest({ id: 1, description: 'This is my 1st quest', title: 'Quest1', xp: 0, reward: 100 });
        expect(quest.equals(identicalQuest)).toBe(true);
    });
});
