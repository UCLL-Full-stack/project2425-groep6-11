import jwt from 'jsonwebtoken';

interface JwtPayload {
    username: string;
}

const generateJwtToken = ({ username }: JwtPayload): string => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    if (!secret) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

    if (!expiresIn) {
        throw new Error("JWT_EXPIRES_IN is not defined in the environment variables.");
    }

    const options: jwt.SignOptions = {
        issuer: 'app',
        expiresIn: `${expiresIn}h`,
    };

    return jwt.sign({ username }, secret, options);
};

export default generateJwtToken;
