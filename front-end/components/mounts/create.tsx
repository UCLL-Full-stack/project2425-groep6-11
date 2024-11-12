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

function Create() {
    const { toast } = useToast()

    const [name, setName] = useState("");
    const [type, setType] = useState("Hound");
    const [legs, setLegs] = useState<number>(2);

    // I know this notation is wrong
    // It looks like shit
    const [can_fly, setCan_fly] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        createMount(name, type, legs, can_fly).then(_ => console.log("Creating character..."));
    };

    const handleChangeLegs = (legs: number) => {
        setLegs(legs);
    }

    const handleChangeType = (type: string) => {
        setType(type);
    }

    const handleChangeSetFly = (can_fly: boolean) => {
        setCan_fly(can_fly);
    }

    const createMount = async (name: string, type: string, legs: number, can_fly: boolean) => {
        const id = localStorage.getItem('id');
        await MountService.createMount(Number(id), { name, type, legs, can_fly }).then(_ => {
            toast({
                title: "Mount created successfully!",
                description: `${legs} legged ${type}: ${name}`,
            });
        });
    }

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
                                <Label htmlFor="name">Type</Label>
                                <Select>
                                    <SelectTrigger id="framework">
                                        <SelectValue placeholder="Type"/>
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        <SelectItem value="hound">Hound</SelectItem>
                                        <SelectItem value="pegasus">Pegasus</SelectItem>
                                        <SelectItem value="drake">Drake</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex flex-col gap-3 mt-3">
                                <Label htmlFor="role">Legs: {legs}</Label>
                                <Slider defaultValue={[legs]} max={8} step={2}
                                        onValueChange={value => handleChangeLegs(value[0])} />
                            </div>
                            <Separator className="my-5" />
                            <div className="flex gap-1 mt-5">
                                <Checkbox />
                                <Label htmlFor="role">My mount can fly!</Label>
                            </div>

                        </div>
                        <CardFooter className="p-0">
                            <Button type="submit" className="font-semibold">Craft mount</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
            <Toaster/>
        </div>
    );
}

export default Create;
