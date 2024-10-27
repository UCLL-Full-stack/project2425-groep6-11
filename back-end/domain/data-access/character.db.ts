import db from "../../util/database";
import {Character} from "../model/character";
import { CharacterDTO } from '../../types';


async function getCharacterById(id: number): Promise<Character | null> {
    const character = await db.character.findUnique({
        where: { id },
        include: {
            mount: true,
            weapons: true,
            quests: true }
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
export default { getCharacterById, createCharacter }