import { CreateMountDTO } from '@/types';

const getAllMounts = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/mounts", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
};

const createMount = async (id: number, { name, type, legs, can_fly }: CreateMountDTO) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mounts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, base: type, legs: legs, can_fly: can_fly }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};


const MountService = {
    getAllMounts,
    createMount,
};

export default MountService;
