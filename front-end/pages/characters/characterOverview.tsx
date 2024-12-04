import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/characters/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/characters/create';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

export default function CharacterOverview()  {
    const { t } = useTranslation();
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="overview" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">{
                            // @ts-ignore
                            t("character_profile.nav.overview")}</TabsTrigger>
                        <TabsTrigger value="create">{
                            // @ts-ignore
                            t("character_profile.nav.create")}</TabsTrigger>
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

// @ts-ignore
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
}