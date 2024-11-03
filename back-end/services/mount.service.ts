import mountDB from '../domain/data-access/mount.db';
import { Mount } from '../domain/model/mount';
import { MountDTO } from '../types';

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

async function createMount({ name }: MountDTO): Promise<Mount> {
        const defaultSpeed = 10;

        if (!name) {
                throw new Error('Invalid data: name is required for mount creation.');
        }

        try {
                const mount = await mountDB.createMount({ name, speed: defaultSpeed });
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

async function updateMount(id: number, { name, speed }: MountDTO): Promise<Mount> {
        if (name == null || speed == null) {
                throw new Error('Invalid data: name and speed are required for mount update.');
        }

        try {
                const mount = await mountDB.updateMount(id, { name, speed });
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
