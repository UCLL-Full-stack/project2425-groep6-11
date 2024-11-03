import { CreateCharacterDTO, CreateMountDTO } from '@/types';

const getAllMounts = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/mounts", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
};

const createMount = async ({ name }: CreateMountDTO) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mounts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name }),
        });

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Mount created:", data);
        return data;
    } catch (error) {
        console.error("Failed to create mount:", error);
        throw error;
    }
};


const CharacterService = {
    getAllMounts,
    createMount,
};

export default CharacterService;
