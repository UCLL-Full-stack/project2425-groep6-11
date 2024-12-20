import {Weapon} from "./weapon";
import {Mount} from "./mount";
import {Quest} from "./quest";
import {
    Character as CharacterPrisma,
    Mount as MountPrisma,
    Weapon as WeaponPrisma,
    Quest as QuestPrisma,
    User as UserPrisma
} from "@prisma/client";
import { User } from './user';

export class Character {
    readonly _id?: number;
    private _name: string;
    private _role: string;
    private _level: number;

    private _power: number;
    private _mana: number;
    private _health: number;
    private _defense: number;
    private _currency: number;

    private _mount?: Mount;
    private _weapons: Weapon[];
    private _equipped?: Weapon;
    private _quests: Quest[];

    private _user?: User;

    constructor(character: {
        id?: number,
        name: string,
        role: string,
        level: number,
        power: number,
        mana: number,
        health: number,
        defense: number,
        currency: number,
        weapons: Weapon[],
        equipped?: Weapon,
        mount?: Mount,
        quests: Quest[]
        user?: User,
    }) {
        this.validate(character);

        this._id = character.id;
        this._name = character.name;
        this._role = character.role;
        this._level = character.level;

        this._power = character.power;
        this._mana = character.mana;
        this._health = character.health;
        this._defense = character.defense;
        this._currency = character.currency;

        this._weapons = character.weapons;
        this._equipped = character.equipped;
        this._mount = character.mount;
        this._quests = character.quests;

        this._user = character.user;
    }

    public get name() {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get role() {
        return this._role;
    }

    public set role(value) {
        this._role = value;
    }

    public get level() {
        return this._level;
    }

    public set level(value) {
        this._level = value;
    }

    public get power() {
        return this._power;
    }

    public set power(value) {
        this._power = value
    }

    public get mana() {
        return this._mana;
    }

    public set mana(value) {
        this._mana = value;
    }

    public get health() {
        return this._health;
    }

    public set health(value) {
        this._health = value;
    }

    public get defense() {
        return this._defense;
    }

    public set defense(value) {
        this._defense = value;
    }

    public get currency() {
        return this._currency;
    }

    public set currency(value) {
        this._currency = value;
    }

    public get mount() {
        return this._mount;
    }

    public set mount(value) {
        this._mount = value;
    }

    public get weapons() {
        return this._weapons;
    }

    public addWeapon(weapon: Weapon) {
        this._weapons.push(weapon);
    }

    public get quests() {
        return this._quests;
    }

    public addQuest(quest: Quest) {
        this._quests.push(quest);
    }

    equals(other: Character): boolean {
        return (
            this._id === other._id &&
            this._name === other._name &&
            this._role === other._role &&
            this._level === other._level &&
            this._power === other._power &&
            this._mana === other._mana &&
            this._health === other._health &&
            this._defense === other._defense &&
            this._currency === other._currency &&
            this._equipped === other._equipped &&
            this._user === other._user
        );
    }

    validate(character: {
        id?: number;
        name: string;
        role: string;
        level: number;
        power: number;
        mana: number;
        health: number;
        defense: number;
        currency: number;
        weapons: Weapon[];
        equipped?: Weapon;
        mount?: Mount;
        quests: Quest[];
        user?: User
    }) {
        if (character.name.length < 3) {
            throw new Error("Name must be at least 3 characters long")
        }
    }

    static from({
        id,
        name,
        role,
        level,
        power,
        mana,
        health,
        defense,
        currency,
        equipped,
        mount,
        weapons,
        quests,
        user
    }: CharacterPrisma
        & { mount: MountPrisma | null }
        & { weapons: WeaponPrisma[] }
        & { equipped: WeaponPrisma | null }
        & { quests: QuestPrisma[] }
        & { user: UserPrisma | null }
    ): Character {
        return new Character({
            id,
            name,
            role,
            level,
            power,
            mana,
            health,
            defense,
            currency,
            equipped: equipped ? Weapon.from(equipped) : undefined,
            mount: mount ? Mount.from(mount) : undefined,
            weapons: weapons.map((weapon: any) => Weapon.from(weapon)),
            quests: quests.map((quest: any) => Quest.from(quest)),
            user: user ? User.from(user) : undefined
        });
    }
}
