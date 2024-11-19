import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/quests/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/quests/create';
import SignUp from '@/components/users/signup';

const QuestOverview: React.FC = () => {
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="create" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="create">Sign up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <ProfileCollection />
                    </TabsContent>
                    <TabsContent value="create">
                        <SignUp />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

export default QuestOverview;
