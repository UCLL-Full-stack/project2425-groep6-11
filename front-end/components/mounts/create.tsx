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
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
import MountService from '@/services/mountService';
import { Toaster } from '@/components/ui/toaster';
import CharacterService from '@/services/characterService';
import { useTranslation } from 'next-i18next';

function Create() {
    const { toast } = useToast()
    const { t } = useTranslation()

    const [name, setName] = useState("");
    const [type, setType] = useState("Hound");
    const [legs, setLegs] = useState<number>(2);

    // doodoo notation
    const [can_fly, setCan_fly] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await createMount(name, type, legs, can_fly).then(_ => console.log("Creating mount..."));
    };

    const handleChangeLegs = (legs: number) => {
        setLegs(legs);
    }

    const handleChangeSetFly = (checked: boolean) => {
        setCan_fly(checked);
    }

        const createMount = async (name: string, type: string, legs: number, can_fly: boolean) => {
            const id = sessionStorage.getItem('id');
            const character = await CharacterService.getCharacterByUserId(Number(id))

            if (character) {
                try {
                    await MountService.createMount(Number(character._id), { name, type, legs, can_fly }).then(_ => {
                        toast({
                            title: "Mount created successfully!",
                            description: `${legs} legged ${type}: ${name}`,
                        });
                    });

                    const updatedCharacter = await CharacterService.getCharacterByUserId(Number(id));

                    await CharacterService.updateCharacter(Number(updatedCharacter._id), {
                        ...updatedCharacter,
                        _mana: updatedCharacter._mount._speed * 5,
                        _hp: updatedCharacter._mount._legs * updatedCharacter._hp
                    })

                } catch (error) {
                    console.error("Error creating mount:", error);
                    toast({
                        title: "Mount creation failed",
                        description: `${error}`,
                        variant: "destructive",
                    });
                }
            } else {
                toast({
                    title: "Create a character first!",
                    description: "No character to add mount.",
                    variant: "destructive"
                });
            }
        }

    return (
        <div className="flex justify-center">
            <Card className="my-1 w-[400px]">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="name">{
                                    // @ts-ignore
                                    t("mount_create.name")
                                }</Label>
                                <Input
                                    id="name"
                                    placeholder={
                                        // @ts-ignore
                                        t("mount_create.name")
                                    }
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="type">{
                                    // @ts-ignore
                                    t("mount_create.type")
                                }</Label>
                                <Select onValueChange={(value) => setType(value)}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder={
                                            // @ts-ignore
                                            t("mount_create.type")
                                        }/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="hound">{
                                            // @ts-ignore
                                            t("mount_profile.base.hound")
                                        }</SelectItem>
                                        <SelectItem value="pegasus">{
                                            // @ts-ignore
                                            t("mount_profile.base.pegasus")
                                        }</SelectItem>
                                        <SelectItem value="drake">{
                                            // @ts-ignore
                                            t("mount_profile.base.drake")
                                        }</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-3 mt-3">
                                <Label htmlFor="role">{
                                    // @ts-ignore
                                    t("mount_create.legs")
                                }: {legs}</Label>
                                <Slider defaultValue={[legs]} max={8} step={2}
                                        onValueChange={value => handleChangeLegs(value[0])} />
                            </div>
                            <Separator className="my-5" />
                            <div className="flex gap-1 mt-5">
                                <Checkbox id="canFly" checked={can_fly} onCheckedChange={handleChangeSetFly}/>
                                <Label htmlFor="canFly">{
                                    // @ts-ignore
                                    t("mount_create.can_fly")
                                }</Label>
                            </div>

                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">{
                                // @ts-ignore
                                t("mount_create.craft_mount")
                            }</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster/>
        </div>
    );
}

export default Create;
