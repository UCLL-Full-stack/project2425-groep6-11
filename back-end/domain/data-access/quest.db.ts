import { Quest } from '../model/quest';
import db from '../../util/database';
import { QuestDTO } from '../../types';

async function getQuestById(id: number): Promise<Quest | null> {
    const quest = await db.quest.findUnique({
        where: { id }
    });

    return quest ? Quest.from(quest) : null;
}

async function createQuest({ xp, title, description, reward }: QuestDTO): Promise<Quest> {
    const quest = await db.quest.create({
        data: {
            xp,
            title,
            description,
            reward
        }
    });

    return Quest.from(quest);
}

async function deleteQuest(id: number): Promise<Quest> {
    const quest = await db.quest.delete({
        where: { id },
    });

    return Quest.from(quest);
}

async function getAllQuests(): Promise<Quest[]> {
    const quests = await db.quest.findMany();
    return quests.map(quest => Quest.from(quest));
}

async function updateQuest(id: number, { xp, title, description }: QuestDTO): Promise<Quest> {
    const quest = await db.quest.update({
        where: { id },
        data: {
            xp,
            title,
            description
        }
    });

    return Quest.from(quest);
}

export default {
    getQuestById,
    createQuest,
    deleteQuest,
    getAllQuests,
    updateQuest
}