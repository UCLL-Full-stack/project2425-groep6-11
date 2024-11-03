import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CharacterService from '@/services/characterService';
import { Character, Weapon } from '@/types';
import Profile from './profile';
import WeaponService from '@/services/weaponService';

const getAllWeapons = async (): Promise<Weapon[]> => {
    const weapons = await WeaponService.getAllWeapons();
    console.log(weapons);
    return weapons || [];
};

function ProfileCollection() {
    const [weapons, setWeapons] = React.useState<Weapon[]>([]);

    React.useEffect(() => {
        const fetchWeapons = async () => {
            const weaponsData = await getAllWeapons();
            setWeapons(weaponsData);
        };

        fetchWeapons().then(_ => console.log("Fetching weapons..."));
        const interval = setInterval(fetchWeapons, 3000);

        return () => clearInterval(interval);
    }, [weapons]);

    return (
        <div className="flex justify-center">
            <Carousel className="max-w-sm">
                <CarouselContent>
                    {weapons.map((weapon, index) => (
                        <CarouselItem key={index}>
                            <div className="flex justify-center p-1">
                                <Profile weapon={weapon}/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )}

export default ProfileCollection;
