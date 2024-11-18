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

const getCharacterById = async (): Promise<Character | undefined> => {
    const id = localStorage.getItem('id');
    if (id) {
        return await CharacterService.getCharacterById(Number(id)) || undefined;
    }
};

function ProfileCollection() {
    const [character, setCharacter] = React.useState<Character>();

    React.useEffect(() => {
        const fetchCharacters = async () => {
            const characterData = await getCharacterById();
            setCharacter(characterData);
        };

        fetchCharacters().then(() => console.log("Fetching characters..."));
        const interval = setInterval(fetchCharacters, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center">
            {character?._weapons && character?._weapons.length > 0 ? (
                <Carousel className="max-w-sm">
                    <CarouselContent>
                        {character._weapons.map((weapon, index) => (
                            <CarouselItem key={index}>
                                <div className="flex justify-center p-1">
                                    <Profile weapon={weapon} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            ) : (
                <p className="text-xl font-medium my-10">No weapons yet!</p>
            )}
        </div>
    );
}

export default ProfileCollection;
