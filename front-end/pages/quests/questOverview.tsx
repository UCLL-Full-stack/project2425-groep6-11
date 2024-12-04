import React, { useEffect, useState } from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/quests/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/quests/create';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function QuestOverview() {
    const { t } = useTranslation();
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
    }, []);

    return (
        <>
            <NavBar />
            {role === "game master" ? (
                <div className="flex justify-center">
                    <Tabs defaultValue="overview" className="w-[350px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">{
                                // @ts-ignore
                                t("quests_profile.nav.overview")}</TabsTrigger>
                            <TabsTrigger value="create">{
                                // @ts-ignore
                                t("quests_profile.nav.create")}</TabsTrigger>
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

// @ts-ignore
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
}