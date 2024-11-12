import * as React from 'react';

import { PinBottomIcon, TrashIcon } from '@radix-ui/react-icons';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mount, Weapon } from '@/types';
import { Separator } from '@/components/ui/separator';


type ProfileProps = {
    mount: Mount
}

function Profile({ mount }: ProfileProps) {
    return (
        <Card className="my-1 w-[350px]">
            <div>
                <CardHeader>
                    <CardTitle>{mount._name}
                    </CardTitle>
                    <CardDescription className="pt-1">
                        <div className="flex gap-2">
                            <Badge>{mount._base}</Badge>
                            <PinBottomIcon className="mt-1 hover:cursor-pointer" />
                            <TrashIcon className="mt-1 hover:cursor-pointer text-red-500" />

                        </div>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <Separator />
                        <div className="grid grid-cols-3">
                            <div>
                                <Label htmlFor="stats" className="font-semibold">Legs</Label>
                                <p>{mount._legs}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">Speed</Label>
                                <p>{mount._speed}</p>
                            </div>
                            <div>
                                <Label htmlFor="stats" className="font-semibold">Flying</Label>
                                <p>{mount._can_fly ? 'Yes' : 'No'}</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}

export default Profile;
