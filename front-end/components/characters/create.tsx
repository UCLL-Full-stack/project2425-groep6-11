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

function Create() {
    const { toast } = useToast()

    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("Warrior");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createCharacter(name, role).then(_ => console.log("Creating character..."));
    };

    const createCharacter = async (name: string, role: string) => {
        try {
            const character = await CharacterService.createCharacter({ name, role });

            if (character) {
                localStorage.setItem('id', character._id.toString());
                localStorage.setItem('name', character._name);

                toast({
                    title: "Character created successfully!",
                    description: `${name} as a ${role}`,
                    variant: "default"
                });
            }
        } catch (error) {
            console.error("Error creating character:", error);
            toast({
                title: "Character creation failed",
                description: "There was an error creating your character.",
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="role">Role</Label>
                                <Select onValueChange={(value) => setRole(value)}>
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Warrior" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="warrior">Warrior</SelectItem>
                                        <SelectItem value="mage">Mage</SelectItem>
                                        <SelectItem value="ranger">Ranger</SelectItem>

                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Create Character</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster/>
        </div>
    );
}

export default Create;
