import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/characters/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/mounts/create';

const CharacterOverview: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="overview" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2 p-0">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="create">Create</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <ProfileCollection />
                    </TabsContent>
                    <TabsContent value="create">
                        <Create />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default CharacterOverview;
