import express, { Request, Response } from 'express';
import userService from '../services/user.service';

const userRouter = express.Router();

userRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { username, password, email,  role } = req.body;
        const newUser = await userService.createUser({ username, password, email, role });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default userRouter;