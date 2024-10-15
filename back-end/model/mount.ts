export class Mount {
    readonly _id?: number;
    private _name: string;
    private _speed: number;

    constructor(mount: {
        id?: number,
        name: string,
        speed: number
    }) {
        this._id = mount.id;
        this._name = mount.name;
        this._speed = mount.speed;
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
}