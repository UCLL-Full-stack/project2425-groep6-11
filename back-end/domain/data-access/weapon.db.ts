import { Weapon } from '../model/weapon';
import db from '../../util/database';
import { WeaponDTO } from '../../types';

async function getWeaponById(id: number): Promise<Weapon | null> {
        const weapon = await db.weapon.findUnique({
                where: { id }
        });

        return weapon ? Weapon.from(weapon) : null;
}

async function createWeapon({ name, type, damage, quality }: WeaponDTO) {
        const weapon = await db.weapon.create({
                data: {
                        name,
                        type,
                        damage,
                        quality
                }
        });

        return Weapon.from(weapon);
}

async function deleteWeapon(id: number): Promise<Weapon> {
        const weapon = await db.weapon.delete({
                where: { id },
        });

        return Weapon.from(weapon);
}

async function getAllWeapons(): Promise<Weapon[]> {
        const weapons = await db.weapon.findMany();
        return weapons.map(weapon => Weapon.from(weapon));
}

async function updateWeapon(id: number, { name, type, damage, quality }: WeaponDTO): Promise<Weapon> {
        const weapon = await db.weapon.update({
                where: { id },
                data: {
                        name: name,
                        type: type,
                        damage: damage,
                        quality: quality
                }
        });

        return Weapon.from(weapon);
}

export default {
        getWeaponById,
        deleteWeapon,
        getAllWeapons,
        updateWeapon,
        createWeapon
}