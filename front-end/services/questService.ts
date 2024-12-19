import { CreateQuestDTO, Quest } from '@/types';

const getAllQuests = async () => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!res.ok) {
            throw new Error(`Failed to retrieve quest: ${res.statusText}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching quests:", error);
        throw error;
    }
};

const createQuest = async ({ title, description, xp, reward }: CreateQuestDTO) => {
    try {

        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: title, description: description, xp: xp, reward: reward }),
        });

        console.log(response)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const deleteQuest = async (id: number) => {
    try {

        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const updateQuest = async (id: number, quest: Quest) => {
    try {
        const token = sessionStorage.getItem("token");

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(quest)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const QuestService = {
    getAllQuests,
    createQuest,
    deleteQuest,
    updateQuest
};

export default QuestService;
