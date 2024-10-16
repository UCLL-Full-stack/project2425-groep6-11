import {Weapon} from "./weapon";
import {Mount} from "./mount";
import {Quest} from "./quest";

export class Character {
    readonly _id?: number;
    private _name: string;
    private _class: string;
    private _level: number;

    private _power: number;
    private _mana: number;
    private _health: number;
    private _defense: number;

    private _mount: Mount;
    private readonly _weapons: Weapon[];
    private readonly _quests: Quest[];

    constructor(character: {
        id?: number,
        name: string,
        class: string,
        level: number,
        power: number,
        mana: number,
        health: number,
        defense: number,
        weapons: Weapon[],
        mount: Mount,
        quests: Quest[]
    }) {
        this._id = character.id;
        this._name = character.name;
        this._class = character.class;
        this._level = character.level;

        this._power = character.power;
        this._mana = character.mana;
        this._health = character.health;
        this._defense = character.defense;

        this._weapons = character.weapons;
        this._mount = character.mount;
        this._quests = character.quests;
    }

    public get name() {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get class() {
        return this._class;
    }

    public set class(value) {
        this._class = value;
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
            this._class === other._class &&
            this._level === other._level &&
            this._power === other._power &&
            this._mana === other._mana &&
            this._health === other._health &&
            this._defense === other._defense
        );
    }

}