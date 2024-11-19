import { Character } from "../domain/model/character";
import characterDB from "../domain/data-access/character.db";
import { CharacterDTO } from '../types';

async function getCharacterById(id: number): Promise<Character> {
    try {
        const character = await characterDB.getCharacterById(id);

        if (!character) {
            throw new Error(`Character with id ${id} does not exist.`);
        }

        return character;
    } catch (error) {
        console.error(`Error retrieving character with id ${id}:`, error);
        throw new Error('Failed to retrieve character.');
    }
}

async function createCharacter(id: number, { name, role }: CharacterDTO): Promise<Character> {
    if (!name || !role || !id) {
        throw new Error('Invalid data: name, role and user are required for character creation.');
    }

    try {
        const character = await characterDB.createCharacter(id, { name, role });

        if (!character) {
            throw new Error(`Failed to create character with name: ${name}.`);
        }

        return character;
    } catch (error) {
        console.error(`Error creating character with name ${name}:`, error);
        throw new Error('Failed to create character.');
    }
}

async function deleteCharacter(id: number): Promise<Character> {
    try {
        const character = await characterDB.deleteCharacter(id);

        if (!character) {
            throw new Error(`Character with id ${id} does not exist or could not be deleted.`);
        }

        return character;
    } catch (error) {
        console.error(`Error deleting character with id ${id}:`, error);
        throw new Error('Failed to delete character.');
    }
}

async function getAllCharacters(): Promise<Character[]> {
    try {
        return await characterDB.getAllCharacters();
    } catch (error) {
        console.error('Error retrieving characters:', error);
        throw new Error('Failed to retrieve characters.');
    }
}

async function updateCharacter( id: number, { name, role, level, power, mana, health, defense, mount, weapons, quests, currency, user }: CharacterDTO): Promise<Character> {
    try {
        const character = await characterDB.updateCharacter(id, { name, role, level, power, mana, health, defense, mount, weapons, quests, currency, user });

        if (!character) {
            throw new Error(`Character with id ${id} does not exist or could not be updated.`);
        }

        return character;
    } catch (error) {
        console.error(`Error updating character with id ${id}:`, error);
        throw new Error('Failed to update character.');
    }
}

async function acceptQuest(characterId: number, questId: number): Promise<Character> {
    try {
        const acceptQuest = await characterDB.acceptQuest(characterId, questId);

        if (!acceptQuest) {
            throw new Error(`Character with id ${characterId} does not exist or could not be updated.`);
        }

        return acceptQuest
    } catch (error) {
        console.error(`Error updating character with id ${characterId}:`, error);
        throw new Error('Failed to update character.');
    }
}

async function switchWeapon(characterId: number, weaponId: number): Promise<Character> {
    try {
        const switchWeapon = await characterDB.switchWeapon(characterId, weaponId);

        if (!switchWeapon) {
            throw new Error(`Character with id ${characterId} does not exist or could not be updated.`);
        }

        return switchWeapon
    } catch (error) {
        console.error(`Error updating character with id ${characterId}:`, error);
        throw new Error('Failed to update character.');
    }
}

async function switchMount(characterId: number, mountID: number): Promise<Character> {
    try {
        const switchMount = await characterDB.switchMount(characterId, mountID);

        if (!switchMount) {
            throw new Error(`Character with id ${characterId} does not exist or could not be updated.`);
        }

        return switchMount
    } catch (error) {
        console.error(`Error updating character with id ${characterId}:`, error);
        throw new Error('Failed to update character.');
    }
}

export default {
    getCharacterById,
    createCharacter,
    deleteCharacter,
    getAllCharacters,
    updateCharacter,
    acceptQuest,
    switchWeapon,
    switchMount
};
