import { Weapon } from '../domain/model/weapon';
import weaponDB from '../domain/data-access/weapon.db';
import { WeaponDTO } from '../types';

async function getWeaponById(id: number): Promise<Weapon> {
        try {
                const weapon = await weaponDB.getWeaponById(id);
                if (!weapon) {
                        throw new Error(`Weapon with id ${id} does not exist.`);
                }
                return weapon;
        } catch (error) {
                console.error(`Error retrieving weapon with id ${id}:`, error);
                throw new Error('Failed to retrieve weapon.');
        }
}

async function createWeapon(id: number, { name, type }: WeaponDTO): Promise<Weapon> {
        const damage = Math.floor((Math.random() * 60) + 1);
        const quality = Math.floor((Math.random() * 100) + 1);

        if (!id) {
                throw new Error('You must have a character to craft a weapon!')
        }

        if (!name || !type) {
                throw new Error('Invalid data: name and type are required for weapon creation.');
        }

        try {
                const weapon = await weaponDB.createWeapon(id, { name, type, damage: damage, quality: quality });
                if (!weapon) {
                        throw new Error(`Failed to create weapon with name: ${name}.`);
                }
                return weapon;
        } catch (error) {
                console.error(`Error creating weapon with name ${name}:`, error);
                throw new Error('Failed to create weapon.');
        }
}

async function deleteWeapon(id: number): Promise<Weapon> {
        try {
                const weapon = await weaponDB.deleteWeapon(id);
                if (!weapon) {
                        throw new Error(`Weapon with id ${id} does not exist or could not be deleted.`);
                }
                return weapon;
        } catch (error) {
                console.error(`Error deleting weapon with id ${id}:`, error);
                throw new Error('Failed to delete weapon.');
        }
}

async function getAllWeapons(): Promise<Weapon[]> {
        try {
                return await weaponDB.getAllWeapons();
        } catch (error) {
                console.error('Error retrieving weapons:', error);
                throw new Error('Failed to retrieve weapons.');
        }
}

async function updateWeapon(id: number, { name, type, damage, quality }: WeaponDTO): Promise<Weapon> {
        if (name == null || type == null || damage == null || quality == null) {
                throw new Error('Invalid data: all fields (name, type, damage, and quality) are required for weapon update.');
        }

        try {
                const weapon = await weaponDB.updateWeapon(id, { name, type, damage, quality });
                if (!weapon) {
                        throw new Error(`Weapon with id ${id} does not exist or could not be updated.`);
                }
                return weapon;
        } catch (error) {
                console.error(`Error updating weapon with id ${id}:`, error);
                throw new Error('Failed to update weapon.');
        }
}

export default {
        getWeaponById,
        createWeapon,
        deleteWeapon,
        getAllWeapons,
        updateWeapon
};
