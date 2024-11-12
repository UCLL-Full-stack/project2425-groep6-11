import {Weapon as WeaponPrisma} from "@prisma/client";

export class Weapon {
    readonly _id?: number;
    readonly _name: string;
    readonly _type: string;
    readonly _damage: number;
    readonly _quality: number;
    readonly _cost: number;

    constructor(weapon: {
        id?: number,
        name: string,
        type: string,
        damage: number,
        quality: number,
        cost: number
    }) {
        this._id = weapon.id
        this._name = weapon.name;
        this._type = weapon.type;
        this._damage = weapon.damage;
        this._quality = weapon.quality;
        this._cost = weapon.cost;
    }

    public get name() {
        return this._name;
    }

    public get type() {
        return this._type;
    }

    public get damage() {
        return this._damage;
    }

    public get quality() {
        return this._quality;
    }

    equals(other: Weapon): boolean {
        return (
            this._id === other._id &&
            this._name === other._name &&
            this._type === other._type &&
            this._damage === other._damage &&
            this._quality === other._quality
        );
    }

    static from({ id, name, type, damage, quality, cost }: WeaponPrisma) {
        return new Weapon({ id, name, type, damage, quality, cost });
    }
}