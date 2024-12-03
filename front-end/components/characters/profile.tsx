import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import {
    BookmarkFilledIcon,
    BookmarkIcon,
    CookieIcon,
    DragHandleDots1Icon,
    ExternalLinkIcon,
    Pencil2Icon,
    TrashIcon,
    DotsHorizontalIcon
} from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Character, Quest } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import QuestService from '@/services/questService';
import CharacterService from '@/services/characterService';
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';

type ProfileProps = {
    character: Character;
    onCharacterEdit: () => void
};

const getAllQuests = async (): Promise<Quest[]> => {
    const quests = await QuestService.getAllQuests();
    return quests || [];
};

const Profile = ({ character, onCharacterEdit }: ProfileProps) => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedName, setSelectedName] = useState(character._name);
    const [showQuests, setShowQuests] = useState<boolean>(false);
    const [quests, setQuests] = useState<Quest[]>();

    useEffect(() => {
        const fetchQuests = async () => {
            const questData = await getAllQuests();
            setQuests(questData);
        };

        fetchQuests().then(_ => console.log("Fetching quests..."));
        const interval = setInterval(fetchQuests, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setSelectedName(newName);

        const characterId = character._id;
        if (characterId) {
            await CharacterService.updateCharacter(characterId, {
                ...character,
                _name: newName,
            }).then(_ => onCharacterEdit());
        }
    };

    const handleWeaponChange = async (weaponId: string) => {
        const characterId = character._id;
        await CharacterService.switchWeapon(characterId, Number(weaponId)).then(_ => onCharacterEdit());
    };

    const toggleShowSelect = () => {
        setShowSelect((prev) => !prev);
    };

    return (
        <div className="grid grid-rows-2">
            <Card className="w-[350px]">
                <CardHeader>
                    <div className="flex gap-4">
                        <Avatar className="w-[75px] h-[75px]">
                            <AvatarImage src="/" alt="@shadcn" />
                            <AvatarFallback className="text-xl">{character._name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex gap-1 items-center">
                                <CardTitle className="flex gap-1">
                                    {showSelect ? (
                                        <Input placeholder={character._name} onChange={e => handleNameChange(e)} />
                                    ) : (
                                        <p>{selectedName}</p>
                                    )}
                                </CardTitle>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild className="m-1 p-0.5">
                                        <DotsHorizontalIcon />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={async () => {
                                                const characterId = character._id;
                                                if (characterId) {
                                                    await CharacterService.deleteCharacter(characterId);
                                                }
                                                onCharacterEdit();
                                            }}>
                                                Delete
                                                <DropdownMenuShortcut>
                                                    <TrashIcon className="text-red-500" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={toggleShowSelect}>
                                                Edit
                                                <DropdownMenuShortcut>
                                                    <Pencil2Icon className="hover:cursor-pointer" />
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuItem onClick={_ => setShowQuests(!showQuests)}>
                                                Quests
                                                <DropdownMenuShortcut>
                                                    {showQuests ? (
                                                        <BookmarkFilledIcon className="text-yellow-500" />
                                                    ) : (
                                                        <BookmarkIcon className="text-yellow-500" />
                                                    )}
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Currency
                                                <DropdownMenuShortcut>
                                                    <div className="flex items-center">
                                                        <CookieIcon />
                                                        <p className="font-medium ml-0.5">{character._currency}</p>
                                                    </div>
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <CardDescription className="pt-1">
                                <Badge>{character._role}</Badge>
                                <Progress className="mt-1.5 w-[65px]" value={character._level} />
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Separator />
                    <div className="mb-3">
                        <div className="grid grid-cols-2 py-4 items-center">
                            <Label className="font-semibold">Mount</Label>
                            <div>{character._mount ? (
                                <>
                                    <Label className="font-semibold">{character._mount?._name}</Label>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                className="text-md p-0 shadow-none bg-transparent text-black hover:bg-transparent hover:underline underline-offset-4"><ExternalLinkIcon
                                                className="ml-1" />
                                            </Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent>
                                            <div className="grid grid-cols-3">
                                                <div>
                                                    <Label htmlFor="stats" className="font-semibold">Speed</Label>
                                                    <p>{character._mount._speed}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="stats" className="font-semibold">Legs</Label>
                                                    <p>{character._mount._legs}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="stats" className="font-semibold">Flying</Label>
                                                    <p>{character._mount._can_fly ? 'Yes' : 'No'}</p>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </>
                            ) : (<DragHandleDots1Icon />)}
                            </div>
                        </div>
                        {showSelect ? (
                            <div className="grid grid-cols-2 py-3 items-center">
                                <Label htmlFor="Weapons" className="font-semibold">Weapons</Label>
                                <Select onValueChange={value => handleWeaponChange(value)}>
                                    <SelectTrigger id="Weapons">
                                        <SelectValue placeholder="Weapons" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                        {character._weapons && character._weapons.map((weapon, index) => (
                                            <SelectItem key={index}
                                                        value={weapon._id.toString()}>{weapon._name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 py-4 items-center">
                                <Label className="font-semibold">Weapon</Label>
                                <p>{character._equipped ? (
                                    <>
                                        <Label className="font-semibold">{character._equipped?._name}</Label>
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Button
                                                    className="text-md p-0 shadow-none bg-transparent text-black hover:bg-transparent hover:underline underline-offset-4"><ExternalLinkIcon
                                                    className="ml-1" /></Button>
                                            </HoverCardTrigger>
                                            <HoverCardContent>
                                                <div className="grid grid-cols-2">
                                                    <div>
                                                        <Label htmlFor="stats" className="font-semibold">DMG</Label>
                                                        <p>{character._equipped._damage}</p>
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="stats" className="font-semibold">Quality</Label>
                                                        <p>{character._equipped._quality}</p>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </>
                                ) : (<DragHandleDots1Icon />)}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="grid w-full items-center gap-4">
                        <div className="grid grid-cols-2 space-y-1.5">
                            {renderStat('ATK', character._power)}
                            {renderStat('HP', character._health)}
                            {renderStat('DEF', character._defense)}
                            {renderStat('MANA', character._mana)}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="mt-3 flex justify-center">
                {showQuests && (
                    character._quests && character._quests.length > 0 ? (
                        <Carousel className="max-w-sm">
                            <CarouselContent>
                                {character._quests.map((quest, index) => (
                                    <CarouselItem key={index}>
                                        <h3>{quest._title}</h3>
                                        <p>{quest._description}</p>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    ) : (
                        <p>No quests here!</p>
                    )
                )}
            </div>

        </div>

    )
        ;
};

const renderStat = (label: string, value: number) => (
    <div>
        <Label htmlFor="stats" className="font-semibold">{label}</Label>
        <p>{value}</p>
    </div>
);

export default Profile;
