import db from "../../util/database";
import { Mount } from '../model/mount';
import { MountDTO } from '../../types';

async function getMountById(id: number): Promise<Mount | null> {
        const mount = await db.mount.findUnique(
            {
                    where: { id }
            });

        return mount ? Mount.from(mount) : null;
}

async function createMount({ name, speed }: MountDTO): Promise<Mount> {
        const mount = await db.mount.create({
                data: {
                        name,
                        speed
                }
        });

        return Mount.from(mount);
}

async function deleteMount(id: number): Promise<Mount> {
        const mount = await db.mount.delete({
                where: { id },
        });

        return Mount.from(mount);
}

async function getAllMounts(): Promise<Mount[]> {
        const mounts = await db.mount.findMany();
        return mounts.map(mount => Mount.from(mount));
}

async function updateMount(id: number, { name, speed }: MountDTO): Promise<Mount> {
        const mount = await db.mount.update({
                where: { id },
                data: {
                        name,
                        speed
                }
        });

        return Mount.from(mount);
}

export default {
        getAllMounts,
        getMountById,
        createMount,
        deleteMount,
        updateMount
};