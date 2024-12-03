import express, { Request, Response } from 'express';
import userService from '../services/user.service';

const userRouter = express.Router();

userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, email,  role } = req.body;
        const newUser = await userService.createUser({ username, password, email, role });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const loginUser = await userService.authenticate({ username, password });
        res.status(200).json(loginUser);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})

userRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(Number(id));
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})
export default userRouter;