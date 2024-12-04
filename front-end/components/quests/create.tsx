import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import QuestService from '@/services/questService';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { useTranslation } from 'next-i18next';

function Create() {
    const { toast } = useToast()
    const { t } = useTranslation()

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [xp, setXp] = useState(0);
    const [reward, setReward] = useState(0);

    const handleChangeXp = (xp: number) => {
        setXp(xp);
    }

    const handleChangeReward = (reward: number) => {
        setReward(reward);
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createQuest(title, description, xp, reward).then(_ => console.log("Creating quest..."));
    };

    const createQuest = async (title: string, description: string, xp: number, reward: number) => {
        try {
            await QuestService.createQuest({ title, description, xp, reward }).then(_ => {
                toast({
                    title: "Created quest successfully!",
                    description: `${title}`,
                })
            });
        } catch (error) {
            console.error("Error creating quest:", error);
            toast({
                title: "Quest creation failed",
                description: "There was an error creating your quest.",
                variant: "destructive",
            });
        }

    }

    return (
        <div className="flex justify-center">
            <Card className="w-[400px]">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="Title">{
                                    // @ts-ignore
                                    t("quests_create.title")
                                }</Label>
                                <Input
                                    id="Title"
                                    placeholder={
                                        // @ts-ignore
                                        t("quests_create.title_placeholder")
                                    }
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="type">{
                                    // @ts-ignore
                                    t("quests_create.description")
                                }</Label>
                                <Textarea placeholder={
                                    // @ts-ignore
                                    t("quests_create.description_placeholder")
                                } onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-4">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="xp">XP: {xp}</Label>
                                    <Slider defaultValue={[xp]} max={12} step={1}
                                            onValueChange={value => handleChangeXp(value[0])} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="reward">{
                                        // @ts-ignore
                                        t("quests_create.reward")
                                    }: {reward}</Label>
                                    <Slider defaultValue={[reward]} max={100} step={1}
                                            onValueChange={value => handleChangeReward(value[0])} />
                                </div>
                            </div>

                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">{
                                // @ts-ignore
                                t("quests_create.create_quest")
                            }</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default Create;
