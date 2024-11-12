import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import CharacterService from '@/services/characterService';
import { Character, Quest } from '@/types';
import Profile from './profile';
import { useState } from 'react';
import QuestService from '@/services/questService';

const getAllQuests = async (): Promise<Quest[]> => {
    const quests = await QuestService.getAllQuests();
    return quests || [];
};

function ProfileCollection() {
    const [quests, setQuests] = useState<Quest[]>();

    React.useEffect(() => {
        const fetchQuests = async () => {
            const questData = await getAllQuests();
            setQuests(questData);
        };

        fetchQuests().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchQuests, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center">
            <Carousel className="max-w-sm">
                <CarouselContent>
                    {quests && quests.map((quest, index) => (
                        <CarouselItem key={index}>
                            <div className="flex justify-center p-1">
                                <Profile quest={quest}/>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>

    )}

export default ProfileCollection;
