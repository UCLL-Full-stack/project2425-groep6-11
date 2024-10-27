import {Quest as QuestPrisma} from "@prisma/client";

export class Quest {
    readonly _id?: number;
    readonly _xp: number;
    readonly _title: string;
    readonly _description: string;
    private _completed: boolean;

    constructor(quest: {
        id?: number,
        xp: number,
        title: string,
        description: string
    }) {
        this._id = quest.id;
        this._xp = quest.xp;
        this._title = quest.title;
        this._description = quest.description;
        this._completed = false;
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

    public get completed() {
        return this._completed;
    }

    public set completed(value: boolean) {
        this._completed = value;
    }

    equals(other: Quest): boolean {
        return (
            this._id === other._id &&
            this._xp === other._xp &&
            this._title === other._title &&
            this._description === other._description
        );
    }

    static from({id, xp, title, description}: QuestPrisma): Quest {
        return new Quest({ id, xp, title, description })
    }
}