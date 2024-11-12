import { Character, CreateCharacterDTO, Quest, Weapon } from '@/types';

const getCharacterById = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
}

const getAllCharacters = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/characters", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
};

const createCharacter = async ({ name, role }: CreateCharacterDTO) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, role: role }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const switchWeapon = async (characterId: number, weaponId: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/switchWeapon/${characterId}/${weaponId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Weapon switched:", data);
        return data;
    } catch (error) {
        console.error("Failed to switch weapon:", error);
        throw error;
    }
};

const updateCharacter = async (characterId: number, character: Character) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            throw new Error(`Failed to update character: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const acceptQuest = async (characterId: number, questId: number) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/acceptQuest/${characterId}/${questId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to accept quest: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
};

const CharacterService = {
    getAllCharacters,
    createCharacter,
    getCharacterById,
    acceptQuest,
    switchWeapon,
    updateCharacter
};

export default CharacterService;
