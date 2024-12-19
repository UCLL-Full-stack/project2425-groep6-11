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

const getCharacterById = async (): Promise<Character | undefined> => {
    const id = sessionStorage.getItem('id');
    if (id) {
        return await CharacterService.getCharacterByUserId(Number(id)) || undefined;
    }
};

function ProfileCollection() {
    const [character, setCharacter] = React.useState<Character>();

    const fetchCharacters = async () => {
        const characterData = await getCharacterById();
        setCharacter(characterData);
    };

    React.useEffect(() => {
        fetchCharacters().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchCharacters, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center">
            {character && character?._mount ? (
                <Profile mount={character?._mount} onMountEdit={fetchCharacters}/>
            ) :
                <p className="text-xl font-medium my-10">No mount yet!</p>}
        </div>
    )}

export default ProfileCollection;
