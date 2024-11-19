import { User } from '../domain/model/user';
import userDB from "../domain/data-access/user.db";
import { UserDTO } from '../types';
import bcrypt from 'bcrypt';

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
git
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

async function updateUser( id: number, { username, password, email, role }: UserDTO): Promise<User> {
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

export default {
    getAllUsers,
    getUserById,
    updateUser,
    createUser,
    deleteUser
}