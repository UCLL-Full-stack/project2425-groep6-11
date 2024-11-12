import * as React from "react"

import { PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Badge } from '@/components/ui/badge';
import { Weapon } from '@/types';
import { Separator } from '@/components/ui/separator';

type ProfileProps = {
    weapon: Weapon
}

function Profile({ weapon }: ProfileProps) {
    return (
        <Card className="my-1 w-[350px]">
            <div>
                <CardHeader>
                    <CardTitle>{weapon._name}
                    </CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{weapon._type}</Badge>
                            <PinBottomIcon className="mt-1 hover:cursor-pointer"/>
                            <TrashIcon className="mt-1 hover:cursor-pointer text-red-500"/>
                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <div className="grid grid-cols-2">
                            <div>
                                <Label htmlFor="stats" className="font-semibold">DMG</Label>
                                <p>{weapon._damage}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">Quality</Label>
                                <p>{weapon._quality}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default Profile
