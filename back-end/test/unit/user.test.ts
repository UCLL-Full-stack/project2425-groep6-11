import { Role, User } from '../../domain/model/user';

describe("Weapon Domain Model", () => {
    let user: User;

    beforeEach(() => {
        user = new User({ id: 1, email: 'user@test.com', password: 'Password1*', role: Role.Player, username: 'user' });
    });

    test("User initializes correctly", () => {
        expect(user.username).toBe("user");
        expect(user.email).toBe("user@test.com");
        expect(user.password).toBe("Password1*");
        expect(user.role).toBe(Role.Player);
    });

    test("User username validation", () => {
        expect(() => {
            user = new User({ id: 1, email: 'user@test.com', password: 'Password1*', role: Role.Player, username: ' ' });
        }).toThrow("Username must be at least 3 characters long");
    });

    test("User password validation", () => {
        expect(() => {
            user = new User({ id: 1, email: 'user@test.com', password: 'Pass1', role: Role.Player, username: 'user' });
        }).toThrow("Password must be at least 8 characters long");
    });

    test("User email validation", () => {
        expect(() => {
            user = new User({ id: 1, email: ' ', password: 'Password1*', role: Role.Player, username: 'user' });
        }).toThrow("Email can't be empty");
    });

});
