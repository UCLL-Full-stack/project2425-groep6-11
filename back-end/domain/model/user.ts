import { Character } from './character';
import {  } from '@prisma/client';
import {
    Mount as MountPrisma,
    Quest as QuestPrisma,
    Weapon as WeaponPrisma,
    User as UserPrisma,
    Character as CharacterPrisma
} from '.prisma/client';

export class User {
    readonly _id?: number;
    private _username: string;
    private _email: string;
    private _password: string;
    private _character?: Character;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        character?: Character;
    }) {
        this._id = user.id;
        this._username = user.username;
        this._email = user.email;
        this._password = user.password;
        this._character = user.character;
    }

    public get username() {
        return this._username;
    }

    public get email() {
        return this._email;
    }

    public get password() {
        return this._password;
    }

    public set username(username: string) {
        this._username = username;
    }

    public set email(email: string) {
        this._email = email;
    }

    public set password(password: string) {
        this._password = password;
    }

    public get character(): Character | undefined {
        return this._character;
    }

    public set character(character: Character | undefined) {
        this._character = character;
    }

    equals(other: User): boolean {
        return (
            this._id === other._id &&
            this._username === other._username &&
            this._password === other._password &&
            this._email === other._email &&
            this._character === other._character
        );
    }

    static from(
        {
            id,
            username,
            password,
            email,
            character
        }: UserPrisma
            & { character: CharacterPrisma
                &  { mount: MountPrisma | null }
                & { equipped: WeaponPrisma }
                & { weapons: WeaponPrisma[] }
                & { quests: QuestPrisma[] }
            }
        ) {
        return new User({ id, username, password, email, character: Character.from(character) });
    }
}