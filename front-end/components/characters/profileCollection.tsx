import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CharacterService from '@/services/characterService';
import { Character } from '@/types';
import Profile from "./profile";

const getAllCharacters = async (): Promise<Character[]> => {
    const characters = await CharacterService.getAllCharacters();
    console.log(characters);
    return characters || [];
};

function ProfileCollection() {
    const [characters, setCharacters] = React.useState<Character[]>([]);

    React.useEffect(() => {
        const fetchCharacters = async () => {
            const charactersData = await getAllCharacters();
            setCharacters(charactersData);
        };

        fetchCharacters().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchCharacters, 3000);

        return () => clearInterval(interval);
    }, [characters]);

        return (
            <div className="flex justify-center">
                <Carousel className="max-w-sm">
                    <CarouselContent>
                        {characters.map((character, index) => (
                            <CarouselItem key={index}>
                                <div className="flex justify-center p-1">
                                        <Profile character={character}/>
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
