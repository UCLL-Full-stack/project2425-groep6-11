import { CreateMountDTO, Mount } from '@/types';

const getAllMounts = async () => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/mounts", {
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
        console.error(error);
        throw error;
    }
};

const updateMount = async (id: number, mount: Mount) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mounts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(mount),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

const deleteMount = async (id: number) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mounts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`${error?.errorMessage}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

const createMount = async (id: number, { name, type, legs, can_fly }: CreateMountDTO) => {
    try {
        const token = sessionStorage.getItem('token');

        if (!token) {
            throw new Error("No token found");
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mounts/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name: name, base: type, legs: legs, can_fly: can_fly }),
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


const MountService = {
    getAllMounts,
    createMount,
    updateMount,
    deleteMount
};

export default MountService;
