export class User {
    readonly _id?: number;
    private _username: string;
    private _email: string;
    private _password: string;

    constructor(user: {
        id?: number;
        username: string;
        email: string;
        password: string;
    }) {
        this._id = user.id;
        this._username = user.username;
        this._email = user.email;
        this._password = user.password;
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
}