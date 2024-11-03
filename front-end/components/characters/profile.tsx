import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Character } from '@/types';

const getAllCharacters = async () => {

}

type ProfileProps = {
    character: Character
}
function Profile({ character }: ProfileProps) {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <Avatar className="mb-1 w-[75px] h-[75px]">
                    <AvatarImage src="/" alt="@shadcn" />
                    <AvatarFallback className="text-xl">{character._name[0]}</AvatarFallback>
                </Avatar>
                <CardTitle>{character._name} - level {character._level}</CardTitle>
                <CardDescription className="pt-1">
                    <Badge>{character._role}</Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-3">
                    <div className="grid grid-cols-2 py-3">
                        <Label htmlFor="mount" className="font-semibold">Mount</Label>
                        <Select>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Hound"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="Hound">Hound</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 py-3">
                        <Label htmlFor="name" className="font-semibold">Weapon</Label>
                        <Select>
                            <SelectTrigger id="framework">
                                <SelectValue placeholder="Sword"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="sword">Sword</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="grid grid-cols-2 space-y-1.5">
                            <div>
                                <Label htmlFor="stats" className="font-semibold">ATK</Label>
                                <p>{character._power}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">HP</Label>
                                <p>{character._health}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">DEF</Label>
                                <p>{character._defense}</p>
                            </div>
                            <div>
                            <Label htmlFor="stats" className="font-semibold">MANA</Label>
                                <p>{character._mana}</p>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default Profile
