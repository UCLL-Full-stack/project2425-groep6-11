import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Quest } from '@/types';
import Profile from './profile';
import { useState } from 'react';
import QuestService from '@/services/questService';

const getAllQuests = async (): Promise<Quest[]> => {
    return await QuestService.getAllQuests();
};

function ProfileCollection() {
    const [quests, setQuests] = useState<Quest[]>();

    React.useEffect(() => {
        const fetchQuests = async () => {
            const questData = await getAllQuests();
            setQuests(questData);
        };

        fetchQuests().then(_ => console.log("Fetching characters..."));
        const interval = setInterval(fetchQuests, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex justify-center">
            {quests && quests.length > 0 ? (
            <Carousel className="max-w-sm">
                <CarouselContent>
                    {quests.map((quest, index) => (
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
            ) : (
                <p className="text-xl font-medium my-10">No quests!</p>
            )}
        </div>

    )
}

export default ProfileCollection;
