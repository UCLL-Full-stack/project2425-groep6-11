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
import WeaponService from '@/services/weaponService';
import { Toaster } from '@/components/ui/toaster';

function Create() {
    const { toast } = useToast()

    const [name, setName] = React.useState("");
    const [role, setRole] = React.useState("Sword");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createWeapon(name, role).then(_ => console.log("Creating character..."));
    };

    const createWeapon = async (name: string, type: string) => {
        const id = localStorage.getItem('id');

        try {
            if (id) {
                await WeaponService.createWeapon(Number(id), { name, type }).then(_ => {
                    toast({
                        title: "Crafted weapon successfully!",
                        description: `${type} weapon: ${name}`,
                    })
                });
            }
            else {
                toast({
                    title: "Create a character first!",
                    description: "No character to add weapon.",
                    variant: "destructive"
                })
            }
        } catch (error) {
            console.error("Error creating weapon:", error);
            toast({
                title: "Weapon creation failed",
                description: "There was an error creating your weapon.",
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
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col space-y-3 mt-3">
                                <Label htmlFor="type">Type</Label>
                                <Select onValueChange={(value) => setRole(value)}>
                                    <SelectTrigger id="type">
                                        <SelectValue placeholder="Sword" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="sword">Sword</SelectItem>
                                        <SelectItem value="staff">Staff</SelectItem>
                                        <SelectItem value="bow">Bow</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Craft weapon</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </div>
    );
}

export default Create;
