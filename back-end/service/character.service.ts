import {Character} from "../domain/model/character";
import characterDB from "../domain/data-access/character.db";
import { CharacterDTO } from '../types';

async function getCharacterById(id: number): Promise<Character> {
    const character =  await characterDB.getCharacterById(id);

    if (!character) {
        throw new Error(`Character ${character} does not exist.`);
    }
    return character;

}

async function createCharacter({ name, role }: CharacterDTO): Promise<Character> {
    const character = await characterDB.createCharacter({ name, role });

    if (!character) {
        throw new Error(`Failed to create character: ${name}`);
    }
    return character;
}

async function deleteCharacter(id: number): Promise<Character> {
    const character = await characterDB.deleteCharacter(id);

    if (!character) {
        throw new Error(`Failed to delete character with id: ${id}`);
    }
    return character;
}

async function getAllCharacters(): Promise<Character[]> {
    return await characterDB.getAllCharacters();

}

async function updateCharacter(id: number, { name, role, level, power, mana, health, defense, mount, weapons, quests }: CharacterDTO): Promise<Character> {
    const character = await characterDB.updateCharacter(id, { name, role, level, power, mana, health, defense, mount, weapons, quests })

    if (!character) {
        throw new Error(`Failed to update character with id: ${id}`);
    }
    return character;
}

export default { getCharacterById, createCharacter, deleteCharacter, getAllCharacters, updateCharacter };