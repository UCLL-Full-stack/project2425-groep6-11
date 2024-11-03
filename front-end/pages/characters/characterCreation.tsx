import React from 'react';
import Profile from '@/components/characters/profile';
import NavBar from '@/components/nav/header';
import Create from '@/components/characters/create';


const CharacterCreation: React.FC = () => {
    return (
        <>
            <NavBar/>
            <Create/>
        </>

    )
}

export default CharacterCreation;