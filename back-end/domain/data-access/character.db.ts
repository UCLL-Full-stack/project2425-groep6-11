import db from '../../util/database';
import { Character } from '../model/character';
import { CharacterDTO } from '../../types';

async function getCharacterById(id: number): Promise<Character | null> {
    const character = await db.character.findUnique({
        where: { id },
        include: {
            mount: true,
            weapons: true,
            quests: true,
            equipped: true,
            user: true
        }
    });

    return character ? Character.from(character) : null
}
async function createCharacter(id: number, { name, role }: CharacterDTO): Promise<Character> {
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
            },
            equipped: {
                create: undefined
            },
            user: {
                connect: { id }
            }
        },
        include: {
            mount: true,
            quests: true,
            weapons: true,
            equipped: true,
            user: true
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
            quests: true,
            equipped: true,
            user: true
        }
    });

    return Character.from(character);
}

async function getCharacterByUserId(id: number): Promise<Character | null> {
    const character = await db.character.findUnique({
        where: {
            userId: id,
        },
        include: {
            mount: true,
            weapons: true,
            quests: true,
            equipped: true,
            user: true
        }
    });
    return character ? Character.from(character) : null;
}

async function getAllCharacters(): Promise<Character[]> {
    const characters = await db.character.findMany({
        include: {
            mount: true,
            weapons: true,
            quests: true,
            equipped: true,
            user: true
        }
    });

    return characters.map((character) => Character.from(character));
}

async function updateCharacter(id: number, { name, role, level, power, mana, health, defense, mount, weapons, quests, currency, equipped, user }: CharacterDTO): Promise<Character> {
    try {
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
                ...(mount !== undefined && {
                    mount: mount ? { connect: { id: mount.id } } : { disconnect: true }
                }),
                ...(equipped !== undefined && {
                    equipped: equipped ? { connect: { id: equipped.id } } : { disconnect: true }
                }),
                ...(user !== undefined && {
                    equipped: equipped ? { connect: { id: equipped.id } } : { disconnect: true }
                }),
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
                mount: true,
                equipped: true,
                user: true
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
                mount: true,
                equipped: true,
                user: true
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
        const character = await db.character.update({
            where: { id: characterId },
            data: {
                equipped: {
                    connect: { id: weaponId },
                },
            },
            include: {
                weapons: true,
                quests: true,
                mount: true,
                equipped: true,
                user: true
            },
        });

        return Character.from(character);
    } catch (error) {
        console.error("Error updating character:", error);
        throw new Error('Failed to update character');
    }
}

async function switchMount(characterId: number, mountId: number): Promise<Character> {
    try {
        const character = await db.character.update({
            where: { id: characterId },
            data: {
                mount: {
                    connect: { id: mountId },
                },
            },
            include: {
                weapons: true,
                quests: true,
                mount: true,
                equipped: true,
                user: true
            },
        });

        return Character.from(character);
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
    getCharacterByUserId,
    acceptQuest,
    switchWeapon,
    switchMount
};
