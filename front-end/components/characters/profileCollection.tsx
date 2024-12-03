import * as React from "react";

import CharacterService from '@/services/characterService';
import { Character } from '@/types';
import Profile from "./profile";

const getCharacterById = async (): Promise<Character | undefined> => {
    const id = localStorage.getItem('id');
    if (id) {
        const character = await CharacterService.getCharacterByUserId(Number(id)) || undefined;
        console.log(character);
        return character;
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
                {character ? (
                        <Profile character={character} onCharacterEdit={fetchCharacters}/>
                    ) : (
                        <p className="text-xl font-medium my-10">No character yet!</p>
                )

                }
            </div>

)}

export default ProfileCollection;
