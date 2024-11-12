import * as React from "react";

import { CookieIcon } from "@radix-ui/react-icons";
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
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type ProfileProps = {
    quest: Quest;
};

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
            title: "Error",
            description: "Failed to accept quest.",
        });

        console.error(error);
    }
};

function Profile({ quest }: ProfileProps) {
    const { _id, _title, _xp, _reward, _description } = quest;
    const characterId = React.useMemo(() => localStorage.getItem("id"), []);

    const handleClick = () => {
        if (_id !== undefined) {
            handleAcceptQuest(characterId, _id).then(_ => console.log("Accepting quest..."));
        }
    };

    return (
        <div>
            <Card className="my-1 w-[350px]">
                <CardHeader>
                    <CardTitle>{_title}</CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{_xp} XP</Badge>
                            <Badge>
                                <span className="mx-1">{_reward}</span>
                                <CookieIcon />
                            </Badge>
                        </div>
                        <p className="mt-1.5">{_description}</p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <Button onClick={handleClick}>Accept quest!</Button>
                    </div>
                </CardContent>
            </Card>
            <Toaster />
        </div>

);
}

export default Profile;
