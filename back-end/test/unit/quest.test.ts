import { Quest } from '../../domain/model/quest';

describe('Quest', () => {
    let quest: Quest;

    beforeEach(() => {
        quest = new Quest({
            xp: 100,
            title: 'Defeat the Dragon',
            description: 'You must defeat the dragon to save the village.'
        });
    });

    it('should create a quest with correct properties', () => {
        expect(quest.xp).toBe(100);
        expect(quest.title).toBe('Defeat the Dragon');
        expect(quest.description).toBe('You must defeat the dragon to save the village.');
        expect(quest.completed).toBe(false);
    });

    it('should allow setting the completion status of the quest', () => {
        quest.completed = true;
        expect(quest.completed).toBe(true);
    });

    it('should return false for completed by default', () => {
        expect(quest.completed).toBe(false);
    });
});
