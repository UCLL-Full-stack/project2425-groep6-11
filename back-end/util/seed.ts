import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const player = await prisma.user.create({
        data: {
            email: 'player@example.com',
            username: 'player1',
            password: await bcrypt.hash('Password1*', 12),
            role: 'PLAYER'
        },
    });

    const gameMaster = await prisma.user.create({
        data: {
            email: 'gamemaster@example.com',
            username: 'gamemaster1',
            password: await bcrypt.hash('Password2*', 12),
            role: 'GAME_MASTER'
        },
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
