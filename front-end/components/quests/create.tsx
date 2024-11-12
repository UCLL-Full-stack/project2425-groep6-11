import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useState } from 'react';
import QuestService from '@/services/questService';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

function Create() {
    const { toast } = useToast()

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
        await QuestService.createQuest({ title, description, xp, reward }).then(_ => {
            toast({
                title: "Created quest successfully!",
                description: `${title}`,
            })
        });
    }

    return (
        <div className="flex justify-center">
            <Card className="w-[400px]">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="Title">Title</Label>
                                <Input
                                    id="Title"
                                    placeholder="Death from above!"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="type">Description</Label>
                                <Textarea placeholder="Kill 10 Hell Hornets!" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-4">
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="xp">XP: {xp}</Label>
                                    <Slider defaultValue={[xp]} max={100} step={1}
                                            onValueChange={value => handleChangeXp(value[0])} />
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="reward">Reward: {reward}</Label>
                                    <Slider defaultValue={[reward]} max={100} step={1}
                                            onValueChange={value => handleChangeReward(value[0])} />
                                </div>
                            </div>

                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Create quest</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default Create;
