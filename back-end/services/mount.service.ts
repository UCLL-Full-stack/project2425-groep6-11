import mountDB from '../domain/data-access/mount.db';
import { Mount } from '../domain/model/mount';
import { MountDTO } from '../types';
import CharacterService from './character.service';

async function getMountById(id: number): Promise<Mount> {
    try {
        const mount = await mountDB.getMountById(id);
        if (!mount) {
            throw new Error(`Mount with id ${id} does not exist.`);
        }
        return mount;
    } catch (error) {
        console.error(`Error retrieving mount with id ${id}:`, error);
        throw new Error('Failed to retrieve mount.');
    }
}

async function createMount(id: number, { name, base, legs, can_fly }: MountDTO): Promise<Mount> {
    const speed = Math.floor((Math.random() * 100) + 1);

    if (name.length < 3) {
        throw new Error('Your mount name must have at least 3 characters');
    }

    if (!id) {
        throw new Error('You must have a character to create a mount!')
    }

    const character = await CharacterService.getCharacterById(id)
    if (character.mount) {
        throw new Error("A mount already exists for this character!")
    }

    try {
        const mount = await mountDB.createMount(id, { name, speed: speed, base, legs, can_fly });
        if (!mount) {
            throw new Error(`Failed to create mount with name: ${name}.`);
        }
        return mount;
    } catch (error) {
        console.error(`Error creating mount with name ${name}:`, error);
        throw new Error('Failed to create mount.');
    }
}

async function deleteMount(id: number): Promise<Mount> {
    try {
        const mount = await mountDB.deleteMount(id);
        if (!mount) {
            throw new Error(`Mount with id ${id} does not exist or could not be deleted.`);
        }
        return mount;
    } catch (error) {
        console.error(`Error deleting mount with id ${id}:`, error);
        throw new Error('Failed to delete mount.');
    }
}

async function getAllMounts(): Promise<Mount[]> {
    try {
        return await mountDB.getAllMounts();
    } catch (error) {
        console.error('Error retrieving mounts:', error);
        throw new Error('Failed to retrieve mounts.');
    }
}

async function updateMount(id: number, { name, speed, base, legs }: MountDTO): Promise<Mount> {
    if (name.length < 3) {
        throw new Error('Your mount name must have at least 3 characters');
    }
    
    try {

        const mount = await mountDB.updateMount(id, { name, speed, base, legs });
        if (!mount) {
            throw new Error(`Mount with id ${id} does not exist or could not be updated.`);
        }
        return mount;
    } catch (error) {
        console.error(`Error updating mount with id ${id}:`, error);
        throw new Error('Failed to update mount.');
    }
}

export default {
    getAllMounts,
    getMountById,
    createMount,
    deleteMount,
    updateMount,
};
