import * as React from "react"

import { Pencil2Icon} from '@radix-ui/react-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Character, Weapon } from '@/types';
import WeaponService from '@/services/weaponService';
import { Progress } from '@/components/ui/progress';
import { ChangeEvent, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Toaster } from '@/components/ui/toaster';

type ProfileProps = {
    character: Character
}

const getAllWeapons = async (): Promise<Weapon[]> => {
    const weapons = await WeaponService.getAllWeapons();
    console.log(weapons);
    return weapons || [];
};

function Profile({ character }: ProfileProps) {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedWeapon, setSelectedWeapon] = useState(null);
    const [selectedMount, setSelectedMount] = useState(null);
    const [selectedName, setSelectedName] = useState(character._name);

    const [weapons, setWeapons] = useState<Weapon[]>([]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedName(e.target.value);
    }

    const handleIconClick = () => {
        setShowSelect(!showSelect);
    };

    const handleWeaponSelect = (value: any) => {
        setSelectedWeapon(value);
    };

    const handleMountSelect = (value: any) => {
        setSelectedMount(value);
    }

    useEffect(() => {
        const fetchWeapons = async () => {
            const weaponsData = await getAllWeapons();
            setWeapons(weaponsData);
        };

        fetchWeapons().then(_ => console.log("Fetching weapons..."));
        const interval = setInterval(fetchWeapons, 3000);

        return () => clearInterval(interval);
    }, [weapons]);

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <Avatar className="w-[75px] h-[75px]">
                    <AvatarImage src="/" alt="@shadcn" />
                    <AvatarFallback className="text-xl">{character._name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle className="flex gap-1">
                    {showSelect ? (
                       <Input placeholder={character._name} onChange={handleNameChange} />
                    ) : (
                        <p>{selectedName}</p>
                    )}
                    <Pencil2Icon className="hover:cursor-pointer" onClick={handleIconClick}/>
                </CardTitle>
                <CardDescription className="pt-1">
                    <Badge>{character._role}</Badge>
                    <Progress className="mt-2 w-[50px]" value={character._level}/>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-3">
                    <div className="grid grid-cols-2 py-3 items-center">
                        <Label htmlFor="mount" className="font-semibold">Mount</Label>
                        {showSelect ? (
                            <Select onValueChange={handleMountSelect}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder=""/>
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="Hound">Hound</SelectItem>
                                </SelectContent>
                            </Select>
                        ): (
                            <span>{selectedMount || ""}</span>
                        )}

                    </div>

                    <div className="grid grid-cols-2 py-3 items-center">
                        <Label htmlFor="weapon" className="font-semibold">Weapon</Label>
                        {showSelect ? (
                            <Select onValueChange={handleWeaponSelect}>
                                <SelectTrigger id="framework">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    {weapons && weapons.map((weapon, index) => (
                                        <SelectItem key={index} value={weapon._name}>{weapon._name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ): (
                            <span>{selectedWeapon || ""}</span>
                        )}

                    </div>
                </div>

                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="grid grid-cols-2 space-y-1.5">
                            <div>
                            <Label htmlFor="stats" className="font-semibold">ATK</Label>
                                <p>{character._power}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">HP</Label>
                                <p>{character._health}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">DEF</Label>
                                <p>{character._defense}</p>
                            </div>
                            <div>
                            <Label htmlFor="stats" className="font-semibold">MANA</Label>
                                <p>{character._mana}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Profile
