export type CreateCharacterDTO = {
    name: string,
    role: string
}

export type CreateWeaponDTO = {
    name: string,
    type: string,
}

export type CreateMountDTO = {
    name: string
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
    _weapons?: Weapon[];
    _quests?: QuestDTO[];
}

export interface MountDTO {
    id?: number,
    name: string,
    speed?: number
}

export interface Weapon {
    _id?: number,
    _name: string,
    _type: string,
    _damage: number,
    _quality: number
}

export interface QuestDTO {
    id?: number,
    xp: number,
    title: string,
    description: string
}