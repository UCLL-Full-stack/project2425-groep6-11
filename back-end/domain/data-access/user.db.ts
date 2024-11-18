import { User } from '../model/user';
import db from '../../util/database';

async function getUserById(id: number): Promise<User | null> {
    const user = await db.user.findUnique({
        where: { id },
        include: {
            character: {
                include: {
                    mount: true,
                    weapons: true,
                    quests: true,
                    equipped: true
                },
            }
        }
    });

    return user ? User.from(user) : null;
}
