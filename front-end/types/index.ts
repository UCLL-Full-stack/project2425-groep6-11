export type CreateCharacterDTO = {
    name: string,
    role: string
}

export interface Character {
    _id?: number;
    _name: string;
    _role: string;
    _level: number;
    _power: number;
    _mana: number;
    _health: number;
    _defense: number;
    _mount?: MountDTO;
    _weapons?: WeaponDTO[];
    _quests?: QuestDTO[];
}

export interface MountDTO {
    id?: number,
    name: string,
    speed?: number
}

export interface WeaponDTO {
    id?: number,
    name: string,
    type: string,
    damage?: number,
    quality?: number
}

export interface QuestDTO {
    id?: number,
    xp: number,
    title: string,
    description: string
}