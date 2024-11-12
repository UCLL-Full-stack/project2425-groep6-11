import { CreateQuestDTO } from '@/types';

const getAllQuests = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/quests", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
};

const createQuest = async ({ title, description, xp, reward }: CreateQuestDTO) => {
    console.log(title, description, xp, reward);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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


const MountService = {
    getAllQuests,
    createQuest,
};

export default MountService;
