import React, { useEffect, useState } from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/quests/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/quests/create';

const QuestOverview: React.FC = () => {
    const [role, setRole] = useState<string | null>(null);

    // Check the role on component mount
    useEffect(() => {
        const storedRole = localStorage.getItem('role'); // Assuming 'role' is stored in localStorage
        setRole(storedRole);
    }, []);

    return (
        <>
            <NavBar />
            {role === "game master" ? (
                <div className="flex justify-center">
                    <Tabs defaultValue="overview" className="w-[350px]">
                        <TabsList className="grid w-full grid-cols-2">
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
            ) : (
                <div className="flex justify-center">
                    <Tabs defaultValue="overview" className="w-[350px]">
                        <TabsList className="grid w-full grid-cols-1">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview">
                            <ProfileCollection />
                        </TabsContent>
                    </Tabs>
                </div>
            )}

        </>
    );
}

export default QuestOverview;
