import { User } from '../model/user';
import db from '../../util/database';
import { UserDTO } from '../../types';

async function getUserById(id: number): Promise<User | null> {
    const user = await db.user.findUnique({
        where: { id }
    });
    return user ? User.from(user) : null;
}

async function getUserByUsername(username: string): Promise<User | null> {
    const user = await db.user.findUnique({
        where: { username },
    });
    return user ? User.from(user) : null;
}

async function getUserByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
        where: { email },
    });
    return user ? User.from(user) : null;
}

async function createUser({ username, password, email, role }: UserDTO): Promise<User> {
    const user = await db.user.create({
        data: {
            username,
            password,
            email,
            role: role === 'Game Master' ? 'GAME_MASTER' : 'PLAYER'
        }
    })

    return User.from(user);
}

async function deleteUser(id: number): Promise<User> {
    const user = await db.user.delete({
        where: { id }
    })

    return User.from(user);
}

async function getAllUsers(): Promise<User[]> {
    const users  = await db.user.findMany();
    return users.map((user) => User.from(user))
}

async function updateUser(id: number, { username, password, email, role }: UserDTO): Promise<User> {
    const user = await db.user.update({
        where: { id },
        data: {
            username,
            password,
            email,
            role: role === 'game master' ? 'GAME_MASTER' : 'PLAYER'        }
    })

    return User.from(user);
}

export default {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser,
    createUser,
    getUserByUsername,
    getUserByEmail
}