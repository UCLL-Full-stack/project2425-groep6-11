import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Profile from './profile';
import MountService from '@/services/mountService';
import { Character, Mount } from '@/types';
import CharacterService from '@/services/characterService';

const getCharacterById = async (): Promise<Character> => {
    const id = localStorage.getItem('id');
    const character = await CharacterService.getCharacterById(Number(id));
    return character || [];
};

function ProfileCollection() {
    const [character, setCharacter] = React.useState<Character>();

    React.useEffect(() => {
        const fetchCharacters = async () => {
            const characterData = await getCharacterById();
            setCharacter(characterData);
        };

        fetchCharacters().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchCharacters, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center">
            {character?._mount && <Profile mount={character?._mount}/>}
        </div>
    )}

export default ProfileCollection;
