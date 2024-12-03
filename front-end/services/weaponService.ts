import { CreateWeaponDTO, Weapon } from '@/types';

const getAllWeapons = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/weapons", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getWeaponById = async (id: number) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        return await res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const updateWeapon = async (id: number, weapon: Weapon) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(weapon),
        });

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create weapon:", error);
        throw error;
    }
}

const createWeapon = async (id: number, { name, type }: CreateWeaponDTO) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, type: type }),
        });

        console.log(response.body)
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to create weapon:", error);
        throw error;
    }
};

const deleteWeapon = async (weaponId: number) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weapons/${weaponId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.log("Failed to delete weapon: ", error)
        throw error
    }
}

const WeaponService = {
    getAllWeapons,
    createWeapon,
    deleteWeapon,
    updateWeapon,
    getWeaponById
};

export default WeaponService;
