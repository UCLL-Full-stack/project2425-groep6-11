import { Character, CreateCharacterDTO, Quest, Weapon } from '@/types';

const getCharacterById = async (id: number) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
}

const getCharacterByUserId = async (id: number) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/user/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
}

const getAllCharacters = async () => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/characters", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await res.json();
    } catch (error) {
        console.error("Error fetching characters:", error);
        throw error;
    }
};


const createCharacter = async (id: number, { name, role }: CreateCharacterDTO) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name: name, role: role }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const deleteCharacter = async (characterId: number) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${characterId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }
    } catch (error) {
        console.error("Failed to delete weapon: ", error);
        throw error;
    }
}
const switchWeapon = async (characterId: number, weaponId: number) => {

    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/switchWeapon/${characterId}/${weaponId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to switch weapon:", error);
        throw error;
    }
};

const updateCharacter = async (characterId: number, character: Character) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/${characterId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(character)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
    }
}

const acceptQuest = async (characterId: number, questId: number) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/characters/acceptQuest/${characterId}/${questId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
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
    getCharacterByUserId,
    acceptQuest,
    switchWeapon,
    updateCharacter,
    deleteCharacter
};

export default CharacterService;
