import * as React from "react"

import { ExternalLinkIcon, Pencil2Icon, PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge';
import { Weapon } from '@/types';
import { Separator } from '@/components/ui/separator';
import WeaponService from '@/services/weaponService';
import { ChangeEvent } from 'react';
import CharacterService from '@/services/characterService';
import { Input } from '@/components/ui/input';

type ProfileProps = {
    weapon: Weapon,
    onWeaponEdit: () => void
}



function Profile({ weapon, onWeaponEdit }: ProfileProps) {
    const [selectedName, setSelectedName] = React.useState(weapon._name);
    const [showSelect, setShowSelect] = React.useState(false);

    const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setSelectedName(newName);

        const weaponId = weapon._id;
        if (weaponId) {
            await WeaponService.updateWeapon(weaponId, {
                ...weapon,
                _name: newName,
            }).then(_ => onWeaponEdit());
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
                            <Input placeholder={weapon._name} onChange={e => handleNameChange(e)} />
                        ) : (
                            <p>{selectedName}</p>
                        )}
                    </CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{weapon._type}</Badge>
                            <Pencil2Icon className="mt-1 hover:cursor-pointer" onClick={toggleShowSelect}/>
                            <TrashIcon onClick={async () => {
                                const weaponId = weapon._id;
                                if (weaponId) {
                                    await WeaponService.deleteWeapon(weaponId);
                                }
                                onWeaponEdit()
                            }} className="mt-1 hover:cursor-pointer text-red-500"/>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <div className="grid grid-cols-2">
                            <div>
                                <Label htmlFor="stats" className="font-semibold">DMG</Label>
                                <p>{weapon._damage}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">Quality</Label>
                                <p>{weapon._quality}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default Profile
