import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/weapons/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/weapons/create';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function WeaponOverview() {
    const { t } = useTranslation();
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="overview" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="overview">{
                            // @ts-ignore
                            t("weapon_profile.nav.overview")}
                        </TabsTrigger>
                        <TabsTrigger value="craft">{
                            // @ts-ignore
                            t("weapon_profile.nav.craft")}
                        </TabsTrigger>
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

// @ts-ignore
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
}

