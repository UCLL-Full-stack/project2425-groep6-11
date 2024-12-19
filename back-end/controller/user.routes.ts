import express, { Request, Response } from 'express';
import userService from '../services/user.service';

const userRouter = express.Router();

/**
 * @swagger
 * paths:
 *   /register:
 *     post:
 *       summary: Register a new user
 *       description: Creates a new user in the system with the provided details.
 *       tags:
 *         - User
 *       requestBody:
 *         description: User registration details
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The unique username for the user.
 *                   example: johndoe123
 *                 password:
 *                   type: string
 *                   description: The user's password. It should meet security requirements.
 *                   example: "strongPassword123!"
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The user's email address.
 *                   example: johndoe@example.com
 *                 role:
 *                   type: string
 *                   description: The role assigned to the user (e.g., admin, user, etc.).
 *                   example: user
 *               required:
 *                 - username
 *                 - password
 *                 - email
 *       responses:
 *         '201':
 *           description: User created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the newly created user.
 *                     example: 60f8f28b93a3467890f31234
 *                   username:
 *                     type: string
 *                     description: The username of the newly created user.
 *                     example: johndoe123
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email of the newly created user.
 *                     example: johndoe@example.com
 *                   role:
 *                     type: string
 *                     description: The role assigned to the user.
 *                     example: user
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: The status of the error.
 *                     example: error
 *                   errorMessage:
 *                     type: string
 *                     description: A detailed error message.
 *                     example: "An unexpected error occurred."
 */
userRouter.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, password, email,  role } = req.body;
        const newUser = await userService.createUser({ username, password, email, role });
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * paths:
 *   /login:
 *     post:
 *       summary: Log in a user
 *       description: Authenticates a user and returns their details if login is successful.
 *       tags:
 *         - User
 *       requestBody:
 *         description: User login credentials
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The user's unique username.
 *                   example: johndoe123
 *                 password:
 *                   type: string
 *                   description: The user's password.
 *                   example: "strongPassword123!"
 *               required:
 *                 - username
 *                 - password
 *       responses:
 *         '200':
 *           description: User authenticated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the authenticated user.
 *                     example: 60f8f28b93a3467890f31234
 *                   username:
 *                     type: string
 *                     description: The authenticated user's username.
 *                     example: johndoe123
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email of the authenticated user.
 *                     example: johndoe@example.com
 *                   role:
 *                     type: string
 *                     description: The role assigned to the user.
 *                     example: user
 *                   token:
 *                     type: string
 *                     description: The authentication token for the user.
 *                     example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         '500':
 *           description: Internal Server Error
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     description: The status of the error.
 *                     example: error
 *                   errorMessage:
 *                     type: string
 *                     description: A detailed error message.
 *                     example: "An unexpected error occurred."
 */
userRouter.post('/login', async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const loginUser = await userService.authenticate({ username, password });
        res.status(200).json(loginUser);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
})

/**
 * @swagger
 * paths:
 *   /users/{id}:
 *     get:
 *       summary: Get a user by ID
 *       description: Retrieves a user from the database by their unique ID.
 *       operationId: getUserById
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the user to retrieve.
 *           schema:
 *             type: integer
 *             example: 1
 *       responses:
 *         '200':
 *           description: Successfully retrieved the user.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   username:
 *                     type: string
 *                     example: 'john_doe'
 *                   email:
 *                     type: string
 *                     example: 'john_doe@example.com'
 *         '500':
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   status:
 *                     type: string
 *                     example: 'error'
 *                   errorMessage:
 *                     type: string
 *                     example: 'User not found or some internal error'
 *       security: []
 */
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