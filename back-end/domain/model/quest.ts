import {Quest as QuestPrisma} from "@prisma/client";

export class Quest {
    readonly _id?: number;
    readonly _xp: number;
    readonly _title: string;
    readonly _description: string;
    private _completed: boolean;
    private _reward: number;

    constructor(quest: {
        id?: number,
        xp: number,
        title: string,
        description: string,
        reward: number
    }) {
        this.validate(quest);

        this._id = quest.id;
        this._xp = quest.xp;
        this._title = quest.title;
        this._description = quest.description;
        this._completed = false;
        this._reward = quest.reward;
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

    public get reward() {
        return this._reward;
    }

    public set reward(value: number) {
        this._reward = value;
    }

    validate(quest: { id?: number; xp: number; title: string; description: string; reward: number }) {
        if (quest.xp < 0) {
            throw new Error("Quest XP must be more than 0");
        } else if (quest.reward < 0) {
            throw new Error("Quest reward must be more than 0");
        } else if (quest.title.trim() === "") {
            throw new Error("Title can't be empty");
        } else if (quest.description.trim() === "") {
            throw new Error("Description can't be empty");
        }
    }

    equals(other: Quest): boolean {
        return (
            this._id === other._id &&
            this._xp === other._xp &&
            this._title === other._title &&
            this._description === other._description &&
            this._reward === other._reward
        );
    }

    static from({id, xp, title, description, reward }: QuestPrisma): Quest {
        return new Quest({ id, xp, title, description, reward })
    }
}