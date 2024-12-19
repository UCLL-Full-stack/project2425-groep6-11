import { Character } from './character';
import {  } from '@prisma/client';
import {
    Mount as MountPrisma,
    Quest as QuestPrisma,
    Weapon as WeaponPrisma,
    User as UserPrisma,
    Character as CharacterPrisma,
    Role as RolePrisma
} from '.prisma/client';

export enum Role {
    GameMaster = 'game master',
    Player = 'player',
}

export class User {
    readonly _id?: number;
    private _username: string;
    private _email: string;
    private _password: string;
    private _role: Role

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        character?: Character;
        role: Role
    }) {
        this.validate(user);

        this._id = user.id;
        this._username = user.username;
        this._email = user.email;
        this._password = user.password;
        this._role = user.role;
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
    
    public get role(): Role {
        return this._role;
    }

    public set role(role: Role) {
        this._role = role;
    }

    validate(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
        character?: Character;
        role: Role
    }) {
        if (user.username.length < 3) {
            throw new Error("Username must be at least 3 characters long");
        } else if (user.password.length < 8) {
            throw new Error("Password must be at least 8 characters long");
        } else if (user.email.trim() === "") {
            throw new Error("Email can't be empty");
        }
    }
    equals(other: User): boolean {
        return (
            this._id === other._id &&
            this._username === other._username &&
            this._password === other._password &&
            this._email === other._email &&
            this._role === other._role
        );
    }

    static from(
        {
            id,
            username,
            password,
            email,
            role,
        }: UserPrisma
            & { role: RolePrisma }
    ) {
        return new User({
            id,
            username,
            password,
            email,
            role: role === RolePrisma.GAME_MASTER ? Role.GameMaster : Role.Player });
    }
}