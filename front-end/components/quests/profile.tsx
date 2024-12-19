import * as React from "react";

import { CookieIcon, Pencil2Icon, TrashIcon } from '@radix-ui/react-icons';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quest } from "@/types";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CharacterService from "@/services/characterService";
import { useToast } from '@/hooks/use-toast';
import { Toaster } from "@/components/ui/toaster";
import QuestService from '@/services/questService';
import { Input } from '@/components/ui/input';
import { ChangeEvent } from 'react';
import { useTranslation } from 'next-i18next';

type ProfileProps = {
    quest: Quest;
    onQuestEdit: () => void;
};


function Profile({ quest, onQuestEdit }: ProfileProps) {
    const { toast } = useToast()
    const { t } = useTranslation()

    const [showSelect, setShowSelect] = React.useState<boolean>(false);
    const [selectedTitle, setSelectedTitle] = React.useState(quest._title);
    const [selectedDescription, setSelectedDescription] = React.useState(quest._description);

    const handleAcceptQuest = async (characterId: string | null, questId: number) => {
        if (!characterId) {
            toast({
                title: "Error",
                description: "Character ID not found.",
            });
            return;
        }

        try {
            await CharacterService.acceptQuest(Number(characterId), questId);
            toast({
                title: "Quest accepted!",
            });
        } catch (error) {
            toast({
                title: "Error accepting quest",
                description: `${error}`,
                variant: "destructive"
            });

            console.error(error);
        }
    };

    const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setSelectedTitle(newTitle);

        const questId = quest._id;
        if (questId) {
            await QuestService.updateQuest(questId, {
                ...quest,
                _title: newTitle,
            }).then(_ => onQuestEdit());
        }
    };

    const handleDescChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newDesc = e.target.value;
        setSelectedDescription(newDesc);

        const questId = quest._id;
        if (questId) {
            await QuestService.updateQuest(questId, {
                ...quest,
                _description: newDesc
            }).then(_ => onQuestEdit());
        }
    };

    const toggleShowSelect = () => {
        setShowSelect((prev) => !prev);
    };

    const handleClick = async () => {
        const userId = sessionStorage.getItem("id");
        const character = await CharacterService.getCharacterByUserId(Number(userId));

        if (quest._id && character) {
            try {
                handleAcceptQuest(character._id, quest._id).then(_ => console.log("Accepting quest..."));
            } catch (error) {
                toast({
                    title: "Accepting quest failed",
                    description: `${error}`,
                    variant: "destructive",
                });
            }
        } else {
            toast({
                title: "Create a character first!",
                description: "No character to accept quest.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="my-1 w-[350px]">
                <CardHeader>
                    <CardTitle>
                        {showSelect ? (
                            <Input placeholder={quest._title} onChange={e => handleNameChange(e)} />
                        ) : (
                            <p>{selectedTitle}</p>
                        )}
                    </CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{quest._xp}XP</Badge>
                            <Badge>
                                <span className="mx-1">{quest._reward}</span>
                                <CookieIcon />
                            </Badge>
                            {sessionStorage.getItem('role') === 'game master' && (
                                <div className="flex gap-2">
                                    <Pencil2Icon className="mt-1 hover:cursor-pointer" onClick={toggleShowSelect}/>
                                    <TrashIcon onClick={async () => {
                                        const questId = quest._id;
                                        if (questId) {
                                            await QuestService.deleteQuest(questId);
                                        }
                                        onQuestEdit()
                                    }} className="mt-1 hover:cursor-pointer text-red-500" />
                                </div>
                            )}
                        </div>
                        <p className="mt-1.5">
                            {showSelect ? (
                                <Input placeholder={quest._description} onChange={e => (handleDescChange(e))} />
                            ) : (
                                <p>{selectedDescription}</p>
                            )}
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <Button onClick={handleClick}>{
                            // @ts-ignore
                            t("quests_profile.accept_quest")
                        }</Button>
                    </div>
                </CardContent>
            </Card>
            <Toaster/>
        </div>
    );
}

export default Profile;
