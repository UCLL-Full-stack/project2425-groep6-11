import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import characterRouter from "./controller/character.routes";
import mountRouter from './controller/mount.routes';
import weaponRouter from './controller/weapon.routes';
import questRouter from './controller/quest.routes';
import userRouter from './controller/user.routes';
import { expressjwt } from 'express-jwt';
import helmet from 'helmet';

const app = express();
dotenv.config();
const port = process.env.APP_PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(helmet())

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
}

app.use(
    expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256']
    }).unless({
        path: ['/api-docs', '/users/login', '/users/register', new RegExp('^/api-docs/.*'), '/status', 'swagger-ui/**', 'swagger-ui**'],
    })
);

app.get('/status', (req, res) => {
    res.json({ message: 'Back-end is running...' });
});

const swaggerOpts = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Courses API',
            version: '1.0.0'
        },
    },
    apis: ['./controller/*.routes.ts'],
}

const swaggerSpec = swaggerJSDoc(swaggerOpts);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/characters', characterRouter);
app.use('/mounts', mountRouter);
app.use('/weapons', weaponRouter);
app.use('/quests', questRouter);
app.use('/users', userRouter);

app.listen(port || 3000, () => {
    console.log(`Back-end is running on port ${port}.`);
});
