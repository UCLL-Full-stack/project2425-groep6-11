import { Quest } from '../domain/model/quest';
import { QuestDTO } from '../types';
import questDB from '../domain/data-access/quest.db';


async function getQuestById(id: number): Promise<Quest | null> {
    try {
        return await questDB.getQuestById(id);
    } catch (error) {
        console.error(`Error retrieving quest with ID ${id}:`, error);
        throw new Error('Failed to retrieve quest');
    }
}

async function createQuest({ title, description, xp, reward}: QuestDTO): Promise<Quest> {
    try {
        return await questDB.createQuest({ title, description, xp, reward});
    } catch (error) {
        console.error('Error creating quest:', error);
        throw new Error('Failed to create quest');
    }
}

async function deleteQuest(id: number): Promise<Quest> {
    try {
        return await questDB.deleteQuest(id);
    } catch (error) {
        console.error(`Error deleting quest with ID ${id}:`, error);
        throw new Error('Failed to delete quest');
    }
}

async function getAllQuests(): Promise<Quest[]> {
    try {
        return await questDB.getAllQuests();
    } catch (error) {
        console.error('Error retrieving quests:', error);
        throw new Error('Failed to retrieve quests');
    }
}

async function updateQuest(id: number, data: QuestDTO): Promise<Quest> {
    const { xp, title, description } = data;

    if (!title || !description || xp == null) {
        throw new Error('Invalid data: title, description, and xp are required');
    }

    try {
        return await questDB.updateQuest(id, data);
    } catch (error) {
        console.error(`Error updating quest with ID ${id}:`, error);
        throw new Error('Failed to update quest');
    }
}

export default {
    getQuestById,
    createQuest,
    deleteQuest,
    getAllQuests,
    updateQuest
};
