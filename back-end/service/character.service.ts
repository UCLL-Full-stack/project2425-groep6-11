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

export default { getCharacterById, createCharacter }