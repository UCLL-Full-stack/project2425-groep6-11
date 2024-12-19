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
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import CharacterService from '@/services/characterService';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useTranslation } from 'next-i18next';

function Create() {
    const { toast } = useToast()
    const { t } = useTranslation();

    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("Warrior");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createCharacter(name, role).then(_ => console.log("Creating character..."));
    };

    const createCharacter = async (name: string, role: string) => {
        try {
            const id = sessionStorage.getItem('id')
            const character = await CharacterService.createCharacter(Number(id), { name, role });

            if (character) {
                toast({
                    title: "Character created successfully!",
                    description: `${name} as a ${role}`,
                    variant: "default"
                });
            }
        } catch (error: any) {
            console.error("Error creating character:", error);
            toast({
                title: "Character creation failed",
                description: `${error}`,
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex justify-center">
            <Card className="my-1 w-[400px]">
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <div className="flex flex-col space-y-3">
                                <Label htmlFor="name">
                                    {
                                        // @ts-ignore
                                        t("character_create.name")
                                    }
                                </Label>
                                <Input
                                    id="name"
                                    placeholder={
                                        // @ts-ignore
                                        t("character_create.name")
                                    }
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="role">
                                    {
                                        // @ts-ignore
                                        t("character_create.role")
                                    }
                                </Label>
                                <Select onValueChange={(value) => setRole(value)}>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder={
                                            // @ts-ignore
                                            t("character_profile.class.warrior")
                                        }/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="warrior">{
                                            // @ts-ignore
                                            t("character_profile.class.warrior")
                                        }</SelectItem>
                                        <SelectItem value="mage">{
                                            // @ts-ignore
                                            t("character_profile.class.mage")
                                        }</SelectItem>
                                        <SelectItem value="ranger">{
                                            // @ts-ignore
                                            t("character_profile.class.ranger")
                                        }</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">{
                                // @ts-ignore
                                t("character_create.create_character")
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
