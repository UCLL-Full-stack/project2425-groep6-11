import {Mount as MountPrisma} from "@prisma/client";

export class Mount {
    readonly _id?: number;
    private _name: string;
    readonly _base: string;
    private _speed: number;
    private _can_fly: boolean;
    private _legs: number;
    readonly _cost: number;

    constructor(mount: {
        id?: number,
        name: string,
        base: string,
        speed: number,
        can_fly: boolean,
        legs: number,
        cost: number
    }) {
        this._id = mount.id;
        this._name = mount.name;
        this._base = mount.base;
        this._speed = mount.speed;
        this._can_fly = mount.can_fly;
        this._legs = mount.legs;
        this._cost = mount.cost;
    }

    public get name() {
        return this._name;
    }

    public set name(value) {
        this._name = value;
    }

    public get speed() {
        return this._speed;
    }

    public set speed(value) {
        this._speed = value;
    }

    equals(other: Mount): boolean {
        return (
            this._id === other._id &&
            this._speed === other._speed &&
            this._name === other._name &&
            this._can_fly === other._can_fly &&
            this._legs === other._legs &&
            this._cost === other._cost &&
            this._base === other._base
        );
    }

    static from({id, speed, name, can_fly, legs, cost, base }: MountPrisma) {
        return new Mount({ id, speed, name, can_fly, legs, cost, base })
    }
}