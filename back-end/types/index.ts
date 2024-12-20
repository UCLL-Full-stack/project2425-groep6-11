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
    equipped?: WeaponDTO;
    mount?: MountDTO;
    weapons?: WeaponDTO[];
    quests?: QuestDTO[];
    user?: UserDTO;
}

export interface UserDTO {
    id?: number;
    username: string;
    password: string;
    email: string;
    role: string;
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

export interface LoginDTO {
    username: string,
    password: string
}

export interface AuthResponse {
    token: string;
    username: string;
    id?: number;
    role: string;
}
export interface QuestDTO {
    id?: number,
    xp: number,
    title: string,
    description: string,
    reward: number
}