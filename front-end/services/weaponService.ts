import { CreateWeaponDTO } from '@/types';

const getAllWeapons = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/weapons", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return await res.json();
};



const createWeapon = async (id: number, { name, type }: CreateWeaponDTO) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, type: type }),
        });

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Weapon created:", data);
        return data;
    } catch (error) {
        console.error("Failed to create weapon:", error);
        throw error;
    }
};

const WeaponService = {
    getAllWeapons,
    createWeapon,
};

export default WeaponService;
