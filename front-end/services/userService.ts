import { CreateCharacterDTO, CreateUserDTO } from '@/types';

const createUser = async ({ username, password, email, role }: CreateUserDTO) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, role }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export default { createUser }