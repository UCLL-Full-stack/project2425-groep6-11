import React from 'react';
import NavBar from '@/components/nav/header';
import ProfileCollection from '@/components/quests/profileCollection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Create from '@/components/quests/create';
import SignUp from '@/components/users/signup';
import Login from '@/components/users/login';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function AccountPage() {
    const { t } = useTranslation();
    return (
        <>
            <NavBar />
            <div className="flex justify-center">
                <Tabs defaultValue="create" className="w-[350px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">{
                            // @ts-ignore
                            t("account.login")}</TabsTrigger>
                        <TabsTrigger value="create">{
                            // @ts-ignore
                            t("account.sign_up")}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <Login />
                    </TabsContent>
                    <TabsContent value="create">
                        <SignUp />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
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