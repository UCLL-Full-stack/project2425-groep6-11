import * as React from 'react';

import { Pencil2Icon, PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mount, Weapon } from '@/types';
import { Separator } from '@/components/ui/separator';
import { ChangeEvent } from 'react';
import WeaponService from '@/services/weaponService';
import MountService from '@/services/mountService';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'next-i18next';


type ProfileProps = {
    mount: Mount,
    onMountEdit: () => void,
}

function Profile({ mount, onMountEdit }: ProfileProps) {
    const { t } = useTranslation();
    const [selectedName, setSelectedName] = React.useState(mount._name);
    const [showSelect, setShowSelect] = React.useState(false);

    const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setSelectedName(newName);

        const mountId = mount._id;
        if (mountId) {
            await MountService.updateMount(mountId, {
                ...mount,
                _name: newName,
            }).then(_ => onMountEdit());
        }
    };

    const toggleShowSelect = () => {
        setShowSelect((prev) => !prev);
    };

    return (
        <Card className="my-1 w-[350px]">
            <div>
                <CardHeader>
                    <CardTitle className="flex gap-1">
                        {showSelect ? (
                            <Input placeholder={mount._name} onChange={e => handleNameChange(e)} />
                        ) : (
                            <p>{selectedName}</p>
                        )}
                    </CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{mount._base}</Badge>
                            <Pencil2Icon className="mt-1 hover:cursor-pointer" onClick={toggleShowSelect} />
                            <TrashIcon onClick={async () => {
                                const mountId = mount._id;
                                if (mountId) {
                                    await MountService.deleteMount(mountId);
                                }
                                onMountEdit();
                            }} className="mt-1 hover:cursor-pointer text-red-500" />
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <div className="grid grid-cols-3">
                            <div>
                                <Label htmlFor="stats" className="font-semibold">{
                                    // @ts-ignore
                                    t("mount_profile.stats.legs")
                                }</Label>
                                <p>{mount._legs}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">{
                                    // @ts-ignore
                                    t("mount_profile.stats.speed")
                                }</Label>
                                <p>{mount._speed}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">{
                                    // @ts-ignore
                                    t("mount_profile.stats.flying")
                                }</Label>
                                <p>{mount._can_fly ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default Profile;
