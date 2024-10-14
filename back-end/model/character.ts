import {Weapon} from "./weapon";
import {Mount} from "./mount";
import {Quest} from "./quest";

class Character {
    readonly _id?: number;
    private _name: string;
    private _role: string;
    private _level: number;

    private _power: number;
    private _mana: number;
    private _health: number;
    private _defense: number;

    private _weapons: Weapon[];
    private _mount: Mount;
    private _quests: Quest[];

    constructor(
        id: number,
        name: string,
        role: string,
        level: number,
        power: number,
        mana: number,
        health: number,
        defense: number,
        weapons: Weapon[],
        mount: Mount,
        quests: Quest[]
    ) {
        this._id = id;
        this._name = name;
        this._role = role;
        this._level = level;

        this._power = power;
        this._mana = mana;
        this._health = health;
        this._defense = defense;

        this._weapons = weapons;
        this._mount = mount;
        this._quests = quests;
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

    public get weapons() {
        return this._weapons;
    }

    public addWeapon(weapon: Weapon) {
        this._weapons.push(weapon);
    }

    public get mount() {
        return this._mount;
    }

    public set mount(value) {
        this._mount = value;
    }

    public get quests() {
        return this._quests;
    }

    public addQuest(quest: Quest) {
        this._quests.push(quest);
    }
    equals(other: Character): boolean {
        if (!other) {
            return false;
        }

        return (
            this._id === other._id &&
            this._name === other._name &&
            this._role === other._role &&
            this._level === other._level &&
            this._power === other._power &&
            this._mana === other._mana &&
            this._health === other._health &&
            this._defense === other._defense
        );
    }

}