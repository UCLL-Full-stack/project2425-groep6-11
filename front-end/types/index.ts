export type CreateCharacterDTO = {
    name: string,
    role: string
}

export type CreateWeaponDTO = {
    name: string,
    type: string
}

export type CreateMountDTO = {
    name: string
    type: string,
    legs: number,
    can_fly: boolean
}

export type CreateQuestDTO = {
    title: string,
    description: string,
    xp: number,
    reward: number
}
export interface Character {
    _id?: number,
    _name: string,
    _role: string,
    _level: number,
    _power: number,
    _mana: number,
    _health: number,
    _defense: number,
    _currency: number,
    _mount?: Mount,
    _weapons?: Weapon[],
    _quests?: Quest[],
}

export interface Mount {
    _id?: number,
    _name: string,
    _base: string,
    _speed: number,
    _can_fly: boolean,
    _legs: number,
    _cost: number
}

export interface Weapon {
    _id?: number,
    _name: string,
    _type: string,
    _damage: number,
    _quality: number,
}

export interface Quest {
    _id?: number,
    _xp: number,
    _title: string,
    _description: string,
    _reward: number
}