export class Quest {
    readonly _id?: number;
    readonly _xp: number;
    readonly _title: string;
    readonly _description: string

    constructor(quest: {
        id: number,
        xp: number,
        title: string,
        description: string
    }) {
        this._id = quest.id;
        this._xp = quest.xp;
        this._title = quest.title;
        this._description = quest.description;
    }

    public get xp() {
        return this._xp;
    }

    public get title() {
        return this._title;
    }

    public get description() {
        return this._description;
    }
}