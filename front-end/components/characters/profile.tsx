import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { CookieIcon, Pencil2Icon, DragHandleDots1Icon, ExternalLinkIcon, BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Character, Quest, Weapon } from '@/types';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import QuestService from '@/services/questService';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CharacterService from '@/services/characterService';
import WeaponService from '@/services/weaponService';

type ProfileProps = {
    character: Character;
};

const getAllQuests = async (): Promise<Quest[]> => {
    const quests = await QuestService.getAllQuests();
    return quests || [];
};

const updateCharacter = async (characterId: number, character: Character): Promise<Character> => {
    return await CharacterService.updateCharacter(characterId, character);
}

const updateWeapon = async (weaponId: number) => {
    const characterId = localStorage.getItem("id");
    return await CharacterService.switchWeapon(characterId, weaponId);
}
const Profile = ({ character }: ProfileProps) => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedName, setSelectedName] = useState(character._name);
    const [showQuests, setShowQuests] = useState<boolean>(false);

    const [quests, setQuests] = useState<Quest[]>();

    useEffect(() => {
        const fetchQuests = async () => {
            const questData = await getAllQuests();
            setQuests(questData);
        };

        fetchQuests().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchQuests, 10000);

        return () => clearInterval(interval);
    }, []);

    const handleNameChange = (character: Character, e: ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setSelectedName(newName);

        const characterId = localStorage.getItem("id");
        updateCharacter(Number(characterId), {
            _currency: character._currency,
            _defense: character._defense,
            _health: character._health,
            _level: character._level,
            _mana: character._mana,
            _name: newName,
            _power: character._power,
            _role: character._role
        }).then(() => console.log("Changing name..."));
    };

    const handleWeaponChange = (weaponId: string) => {
        updateWeapon(Number(weaponId)).then(_ => console.log("Switching weapon..."))
    }

    const toggleShowSelect = () => {
        setShowSelect((prev) => !prev);
    };

    return (
        <div className="grid grid-rows-2">
        <Card className="w-[350px]">
            <div className="flex justify-end m-2.5 items-center text-yellow-500">
                {showQuests ? (
                    <BookmarkFilledIcon onClick={_ => setShowQuests(!showQuests)} />
                ) : (
                    <BookmarkIcon onClick={_ => setShowQuests(!showQuests)} />
                )}
            </div>
            <CardHeader>
                <div className="flex gap-4">
                    <Avatar className="w-[75px] h-[75px]">
                        <AvatarImage src="/" alt="@shadcn" />
                        <AvatarFallback className="text-xl">{character._name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="flex gap-1">
                            {showSelect ? (
                                <Input placeholder={character._name} onChange={e => handleNameChange(character, e)} />
                            ) : (
                                <p>{selectedName}</p>
                            )}
                            <Pencil2Icon className="hover:cursor-pointer" onClick={toggleShowSelect} />
                        </CardTitle>
                        <CardDescription className="pt-1">
                            <Badge>{character._role}</Badge>
                            <Progress className="mt-1.5 w-[65px]" value={character._level} />
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex mt-1 items-center">
                                    <CookieIcon />
                                    <p className="ml-0.5">{character._currency}</p>
                                </div>
                            </div>

                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Separator />
                <div className="mb-3">
                    {showSelect ? (
                        <div className="grid grid-cols-2 py-3 items-center">
                            <Label htmlFor="Mount" className="font-semibold">Mount</Label>
                            <Select>
                                <SelectTrigger id="Mount">
                                <SelectValue placeholder="Mount" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="none">None</SelectItem>
                                    {character._mount && (
                                        <SelectItem value={character._mount._name}>{character._mount._name}</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 py-4 items-center">
                            <Label className="font-semibold">Mount</Label>
                            <p>{character._mount ? (
                                <>
                                    <Label className="font-semibold">{character._mount._name}</Label>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button
                                                className="text-md p-0 shadow-none bg-transparent text-black hover:bg-transparent hover:underline underline-offset-4"><ExternalLinkIcon
                                                className="ml-1"/></Button>
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
                            </p>
                        </div>
                    )}

                    {showSelect ? (
                        <div className="grid grid-cols-2 py-3 items-center">
                            <Label htmlFor="Weapons" className="font-semibold">Weapons</Label>
                            <Select onValueChange={value => handleWeaponChange(value)}>
                                <SelectTrigger id="Weapons">
                                    <SelectValue placeholder="Weapons" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                    <SelectItem value="none" >None</SelectItem>
                                    {character._weapons && character._weapons.map((weapon, index) => (
                                        <SelectItem key={index} value={weapon._id ? weapon._id.toString() : `weapon-${index}`}>{weapon._name} </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 py-4 items-center">
                            <Label className="font-semibold">Weapon</Label>
                            <p>{character._weapons ? (
                                <>
                                    <Label className="font-semibold">{character._weapons[0]._name}</Label>
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
                                                    <p>{character._weapons[0]._damage}</p>
                                                </div>
                                                <div>
                                                    <Label htmlFor="stats" className="font-semibold">Quality</Label>
                                                    <p>{character._weapons[0]._quality}</p>
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

        <div className="mt-6">
            {showQuests && (
                <>
                    <Label>Quest log</Label>
                    <Accordion type="single" collapsible className="w-full mt-3">
                        {quests && quests.map((quest, index) => (
                            <AccordionItem value={`quest-${index}`}>
                                <AccordionTrigger>{quest._title}</AccordionTrigger>
                                <AccordionContent>
                                    <div className="flex gap-2">
                                        <Badge>{quest._xp} XP</Badge>
                                        <Badge>
                                            <span className="mx-1">{quest._reward}</span>
                                            <CookieIcon />
                                        </Badge>
                                    </div>
                                    <p className="mt-1.5">{quest._description}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </>
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
