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
import CharacterService from '@/services/characterService';
import { useToast } from '@/hooks/use-toast';

function Create() {
    const { toast } = useToast()

    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("Warrior");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createCharacter(name, role).then(_ => console.log("Creating character..."));
    };

    const createCharacter = async (name: string, role: string) => {
        await CharacterService.createCharacter({ name, role }).then(_ => {
            console.log("Character created successfully!");
        });

        toast({
            title: "Character created successfully!",
            description: `${name} as ${role}`,
        });
    }

    return (
        <div className="flex justify-center">
            <Card className="w-[380px]">
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
        </div>
    );
}

export default Create;
