export interface CharacterDTO {
    id?: number;
    name: string;
    role: string;
    level?: number;
    power?: number;
    mana?: number;
    health?: number;
    defense?: number;
    mount?: MountDTO;
    weapons?: WeaponDTO[];
    quests?: QuestDTO[];
}

export interface MountDTO {
    id?: number,
    type: string,
    speed: number
}

export interface WeaponDTO {
    id?: number,
    name: string,
    type?: string,
    damage?: number,
    quality?: number
}

export interface QuestDTO {
    id?: number,
    xp: number,
    title: string,
    description: string
}