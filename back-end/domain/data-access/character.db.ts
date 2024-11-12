import db from '../../util/database';
import { Character } from '../model/character';
import { CharacterDTO } from '../../types';

async function getCharacterById(id: number): Promise<Character | null> {
    const character = await db.character.findUnique({
        where: { id },
        include: {
            mount: true,
            weapons: true,
            quests: true
        }
    });

    return character ? Character.from(character) : null
}
async function createCharacter({ name, role }: CharacterDTO): Promise<Character> {
    const character = await db.character.create({
        data: {
            name,
            role,
            mount: {
                create: undefined
            },
            quests: {
                create: []
            },
            weapons: {
                create: []
            }
        },
        include: {
            mount: true,
            quests: true,
            weapons: true
        }
    });

    return Character.from(character);
}

async function deleteCharacter(id: number): Promise<Character> {
    const character = await db.character.delete({
        where: { id },
        include: {
            mount: true,
            weapons: true,
            quests: true
        }
    });

    return Character.from(character);
}

async function getAllCharacters(): Promise<Character[]> {
    const characters = await db.character.findMany({
        include: {
            mount: true,
            weapons: true,
            quests: true
        }
    });

    return characters.map((character) => Character.from(character));
}

async function updateCharacter(id: number, { name, role, level, power, mana, health, defense, mount, weapons, quests, currency }: CharacterDTO): Promise<Character> {
    try {
        console.log(name);
        const character = await db.character.update({
            where: { id },
            data: {
                name,
                role,
                level,
                power,
                mana,
                health,
                defense,
                currency,
                mount: mount ? {
                    connect: { id: mount.id }
                } : {
                    disconnect: true
                },
                weapons: {
                    connect: weapons?.map(weapon => ({ id: weapon.id}))
                },
                quests: {
                    connect: quests?.map(quest => ({ id: quest.id})),
                },
            },
            include: {
                weapons: true,
                quests: true,
                mount: true
            },
        });
        return Character.from(character);
    } catch (error) {
        console.error("Error updating character:", error);
        throw new Error('Failed to update character');
    }
}

async function acceptQuest(characterId: number, questId: number): Promise<Character> {
    try {
        const character = await db.character.update({
            where: { id: characterId },
            data: {
                quests: {
                    connect: { id: questId },
                },
            },
            include: {
                weapons: true,
                quests: true,
                mount: true
            },
        });

        return Character.from(character);
    } catch (error) {
        console.error("Error updating character:", error);
        throw new Error('Failed to update character');
    }
}

async function switchWeapon(characterId: number, weaponId: number): Promise<Character> {
    try {
        // Fetch the current weapons
        const character = await db.character.findUnique({
            where: { id: characterId },
            include: { weapons: true },
        });

        if (!character) {
            throw new Error('Character not found');
        }

        // Reorder weapons so the selected weapon is first
        const reorderedWeapons = [
            ...character.weapons.filter((weapon) => weapon.id === weaponId),
            ...character.weapons.filter((weapon) => weapon.id !== weaponId),
        ];

        // Update the character's weapons with the new order
        await db.character.update({
            where: { id: characterId },
            data: {
                weapons: {
                    set: [], // Temporarily detach all weapons
                    connect: reorderedWeapons.map((weapon) => ({ id: weapon.id })), // Reconnect in new order
                },
            },
            include: {
                weapons: true,
                quests: true,
                mount: true,
            },
        });

        const updatedCharacter = await db.character.findUnique({
            where: { id: characterId },
            include: {
                weapons: true,
                quests: true,
                mount: true,
            },
        });

        if (!updatedCharacter) {
            throw new Error('Character not found');
        }

        return Character.from(updatedCharacter);
    } catch (error) {
        console.error("Error updating character:", error);
        throw new Error('Failed to update character');
    }
}


export default {
    getCharacterById,
    createCharacter,
    deleteCharacter,
    getAllCharacters,
    updateCharacter,
    acceptQuest,
    switchWeapon
};
