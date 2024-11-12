import * as React from "react";

import CharacterService from '@/services/characterService';
import { Character } from '@/types';
import Profile from "./profile";

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
                {character &&
                    <Profile character={character}/>
                }
            </div>

)}

export default ProfileCollection;
