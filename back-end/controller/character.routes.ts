import express, { Request, Response } from "express";
import characterService from "../service/character.service";

const characterRouter = express.Router();

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retrieve a character by ID
 *     description: Fetches a character's details based on their unique ID.
 *     tags:
 *       - Character
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the character to retrieve
 *     responses:
 *       200:
 *         description: Character found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 class:
 *                   type: string
 *                 level:
 *                   type: integer
 *                 power:
 *                   type: integer
 *                 mana:
 *                   type: integer
 *                 health:
 *                   type: integer
 *                 defense:
 *                   type: integer
 *                 mount:
 *                   type: object
 *                 weapons:
 *                   type: array
 *                   items:
 *                     type: object
 *                 quests:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid character ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     description: Adds a new character to the database.
 *     tags:
 *       - Character
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - class
 *               - level
 *               - power
 *               - mana
 *               - health
 *               - defense
 *             properties:
 *               name:
 *                 type: string
 *                 description: Character's name
 *               class:
 *                 type: string
 *                 description: Character's class
 *               level:
 *                 type: integer
 *                 description: Character's level
 *               power:
 *                 type: integer
 *                 description: Character's power
 *               mana:
 *                 type: integer
 *                 description: Character's mana
 *               health:
 *                 type: integer
 *                 description: Character's health
 *               defense:
 *                 type: integer
 *                 description: Character's defense
 *               mountId:
 *                 type: integer
 *                 description: ID of the character's mount
 *     responses:
 *       201:
 *         description: Character created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 class:
 *                   type: string
 *                 level:
 *                   type: integer
 *                 power:
 *                   type: integer
 *                 mana:
 *                   type: integer
 *                 health:
 *                   type: integer
 *                 defense:
 *                   type: integer
 *                 mount:
 *                   type: object
 *                 weapons:
 *                   type: array
 *                   items:
 *                     type: object
 *                 quests:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid character data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
characterRouter.post('/', async (req: Request, res: Response) => {
    try {
        const { name, role } = req.body;

        const newCharacter = await characterService.createCharacter({
            name,
            role
        });

        res.status(201).json(newCharacter);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retrieve a character by ID
 *     description: Fetches a character's details based on their unique ID.
 *     tags:
 *       - Character
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Numeric ID of the character to retrieve
 *     responses:
 *       200:
 *         description: Character found and returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 class:
 *                   type: string
 *                 level:
 *                   type: integer
 *                 power:
 *                   type: integer
 *                 mana:
 *                   type: integer
 *                 health:
 *                   type: integer
 *                 defense:
 *                   type: integer
 *                 mount:
 *                   type: object
 *                 weapons:
 *                   type: array
 *                   items:
 *                     type: object
 *                 quests:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Invalid character ID provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       404:
 *         description: Character not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 errorMessage:
 *                   type: string
 */
characterRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ status: 'error', errorMessage: 'Invalid character ID' });
        }

        const character = await characterService.getCharacterById(id);

        if (!character) {
            return res.status(404).json({ status: 'error', errorMessage: 'Character not found' });
        }

        res.status(200).json(character);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

export default characterRouter;
