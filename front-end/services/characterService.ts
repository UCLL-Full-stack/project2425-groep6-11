import CharacterDTO, { CreateCharacterDTO } from '@/types';

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

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Character created:", data);
        return data;
    } catch (error) {
        console.error("Failed to create character:", error);
        throw error;
    }
};


const CharacterService = {
    getAllCharacters,
    createCharacter,
};

export default CharacterService;
