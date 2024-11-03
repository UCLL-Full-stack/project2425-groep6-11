import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/weapons/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/weapons/create';

const WeaponOverview: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="overview" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2 p-0">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="craft">Craft</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <ProfileCollection />
                    </TabsContent>
                    <TabsContent value="craft">
                        <Create />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default WeaponOverview;
