export interface CharacterDTO {
    id?: number;
    name: string;
    role: string;
    level?: number;
    power?: number;
    mana?: number;
    health?: number;
    defense?: number;
    currency?: number;
    mount?: MountDTO;
    weapons?: WeaponDTO[];
    quests?: QuestDTO[];
}

export interface MountDTO {
    id?: number,
    name: string,
    speed?: number,
    can_fly?: boolean,
    cost?: number,
    legs?: number,
    base: string
}

export interface WeaponDTO {
    id?: number,
    name: string,
    type: string,
    damage?: number,
    quality?: number,
    cost?: number
}

export interface QuestDTO {
    id?: number,
    xp: number,
    title: string,
    description: string,
    reward: number
}