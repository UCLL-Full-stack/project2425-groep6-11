import { User } from '../domain/model/user';
import userDB from "../domain/data-access/user.db";
import { AuthResponse, LoginDTO, UserDTO } from '../types';
import bcrypt from 'bcrypt';
import generateJwtToken from '../util/jwt';

async function getUserById(id: number): Promise<User> {
    try {
        const user = await userDB.getUserById(id);

        if (!user) {
            throw new Error(`User with id ${id} does not exist.`);
        }

        return user;
    } catch (error) {
        console.error(`Error retrieving user with id ${id}:`, error);
        throw new Error('Failed to retrieve user.');
    }
}

async function createUser({ username, password, email, role }: UserDTO): Promise<User> {
    if (!username || !password || !email || !role) {
        throw new Error('Invalid data: username, password, email and role are required for user creation');
    }

    const hashed = await bcrypt.hash(password, 12)
    try {
        const user = await userDB.createUser({ username, password: hashed, email, role })

        if (!user) {
            throw new Error(`Failed to create user with username ${username}`);
        }

        return user
    } catch (error) {
        console.error(`Error creating user with name ${username}:`, error);
        throw new Error('Failed to create user.');
    }
}

async function deleteUser(id: number): Promise<User> {
    try {
        const user = await userDB.deleteUser(id);

        if (!user) {
            throw new Error(`User with id ${id} does not exist or could not be deleted.`);
        }

        return user;
    } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
        throw new Error('Failed to delete user.');
    }
}

async function getAllUsers(): Promise<User[]> {
    try {
        return await userDB.getAllUsers();
    } catch (error) {
        console.error('Error retrieving users:', error);
        throw new Error('Failed to retrieve users.');
    }
}

async function updateUser(id: number, { username, password, email, role }: UserDTO): Promise<User> {
    try {
        const user = await userDB.updateUser(id, { username, password, email, role });

        if (!user) {
            throw new Error(`Character with id ${id} does not exist or could not be updated.`);
        }

        return user;
    } catch (error) {
        console.error(`Error updating user with id ${id}:`, error);
        throw new Error('Failed to update user.');
    }
}

async function getUserByUsername(username: string): Promise<User> {
    try {
        const user = await userDB.getUserByUsername(username);

        if (!user) {
            throw new Error(`Character with username ${username} does not exist or could not be fetched`)
        }

        return user
    } catch (error) {
        console.error(`Error fetching user with username ${username}:`, error);
        throw new Error('Failed to fetch user.');
    }
}

async function authenticate({ username, password }: LoginDTO): Promise<AuthResponse> {
    const user = await getUserByUsername(username);
    const valid = await bcrypt.compare(password, user.password)

    if (!user) {
        throw new Error(`Character with username ${username} does not exist or could not be fetched`)
    }

    if (!valid) {
        throw new Error(`Incorrect password.`)
    }

    return {
        token: generateJwtToken({ username }),
        username: username,
        id: user._id,
        role: user.role,
    }
}

export default {
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser,
    authenticate
}