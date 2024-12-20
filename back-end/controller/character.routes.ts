import express, { Request, Response } from "express";
import characterService from ".././services/character.service";

const characterRouter = express.Router();

/**
 * @swagger
 * /characters:
 *   post:
 *     summary: Create a new character
 *     tags: [Characters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Character created successfully
 *       500:
 *         description: Internal server error
 */
characterRouter.post('/:id', async (req: Request, res: Response) => {
    try {
        const { name, role } = req.body;
        const id = Number(req.params.id);
        const newCharacter = await characterService.createCharacter(id, { name, role });
        res.status(201).json(newCharacter);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Delete a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Character deleted successfully
 *       400:
 *         description: Invalid character ID
 *       404:
 *         description: Character not found
 *       500:
 *         description: Internal server error
 */
characterRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ status: 'error', errorMessage: 'Invalid character ID' });
        }
        const character = await characterService.deleteCharacter(id);
        if (!character) {
            return res.status(404).json({ status: 'error', errorMessage: 'Character not found' });
        }
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /characters/{id}:
 *   get:
 *     summary: Retrieve a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Character retrieved successfully
 *       400:
 *         description: Invalid character ID
 *       404:
 *         description: Character not found
 *       500:
 *         description: Internal server error
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

/**
 * @swagger
 * /characters/user/{id}:
 *   get:
 *     summary: Retrieve a character by user ID
 *     tags:
 *       - Characters
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user whose character is being retrieved
 *     responses:
 *       200:
 *         description: Character retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Character'
 *       400:
 *         description: Invalid user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Invalid user ID
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: An error message
 */
characterRouter.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            return res.status(400).json({ status: 'error', errorMessage: 'Invalid user ID' });
        }
        const character = await characterService.getCharacterByUserId(id);
        res.status(200).json(character);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Retrieve a list of all characters
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: List of characters retrieved successfully
 *       500:
 *         description: Internal server error
 */
characterRouter.get('/', async (req: Request, res: Response) => {
    try {
        const characters = await characterService.getAllCharacters();
        res.status(200).json(characters);
    } catch (error: any) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Update a character by ID
 *     tags: [Characters]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               role:
 *                 type: string
 *               level:
 *                 type: integer
 *               power:
 *                 type: integer
 *               mana:
 *                 type: integer
 *               health:
 *                 type: integer
 *               defense:
 *                 type: integer
 *               mount:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *               weapons:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *               quests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Character updated successfully
 *       400:
 *         description: Invalid character ID
 *       500:
 *         description: Internal server error
 */
characterRouter.put('/:id', async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid character ID' });
    }

    try {
        const { _name, _role, _level, _power, _mana, _health, _defense, _currency } = req.body;

        // Ugly hack
        const name = _name
        const role = _role
        const level = _level
        const power = _power
        const mana = _mana
        const health = _health
        const defense = _defense
        const currency = _currency

        const updatedCharacter = await characterService.updateCharacter(id, { name, role, level, power, mana, health, defense, currency });
        return res.status(200).json(updatedCharacter);
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to update character', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /characters/acceptQuest/{characterId}/{questId}:
 *     put:
 *       summary: Accept a quest for a character
 *       tags: [Characters]
 *       parameters:
 *         - in: path
 *           name: characterId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The character ID
 *         - in: path
 *           name: questId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The quest ID
 *       responses:
 *         200:
 *           description: Quest accepted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Character'
 *         400:
 *           description: Invalid character or quest ID
 *         500:
 *           description: Internal server error
 */
characterRouter.put('/acceptQuest/:characterId/:questId', async (req: Request, res: Response) => {
    const characterId = Number(req.params.characterId);
    const questId = Number(req.params.questId);

    if (isNaN(characterId) || isNaN(questId)) {
        return res.status(400).json({ error: 'Invalid character or quest ID' });
    }

    try {
        const acceptQuest = await characterService.acceptQuest(characterId, questId);
        return res.status(200).json(acceptQuest);
    } catch (error: any) {
        console.error("Error in accepting quest:", error);
        return res.status(500).json({ error: 'Failed to accept quest', errorMessage: error.message });
    }
});

/**
 * @swagger
 *  /characters/switchWeapon/{characterId}/{weaponId}:
 *     put:
 *       summary: Switch weapon for a character
 *       tags: [Characters]
 *       parameters:
 *         - in: path
 *           name: characterId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The character ID
 *         - in: path
 *           name: weaponId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The weapon ID
 *       responses:
 *         200:
 *           description: Weapon switched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Character'
 *         400:
 *           description: Invalid character or weapon ID
 *         500:
 *           description: Internal server error
 */
characterRouter.put('/switchWeapon/:characterId/:weaponId', async (req: Request, res: Response) => {
    const characterId = Number(req.params.characterId);
    const weaponId = Number(req.params.weaponId);

    if (isNaN(characterId) || isNaN(weaponId)) {
        return res.status(400).json({ error: 'Invalid character or weapon ID' });
    }

    try {
        const switchWeapon = await characterService.switchWeapon(characterId, weaponId);
        return res.status(200).json(switchWeapon);
    } catch (error: any) {
        console.error("Error in switching weapon:", error);
        return res.status(500).json({ error: 'Failed to switch weapon', errorMessage: error.message });
    }
});

/**
 * @swagger
 *   /characters/switchMount/{characterId}/{mountId}:
 *     put:
 *       summary: Switch mount for a character
 *       tags: [Characters]
 *       parameters:
 *         - in: path
 *           name: characterId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The character ID
 *         - in: path
 *           name: mountId
 *           required: true
 *           schema:
 *             type: integer
 *           description: The mount ID
 *       responses:
 *         200:
 *           description: Mount switched successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Character'
 *         400:
 *           description: Invalid character or mount ID
 *         500:
 *           description: Internal server error
 */
characterRouter.put('/switchMount/:characterId/:mountId', async (req: Request, res: Response) => {
    const characterId = Number(req.params.characterId);
    const mountId = Number(req.params.mountId);

    if (isNaN(characterId) || isNaN(mountId)) {
        return res.status(400).json({ error: 'Invalid character or mount ID' });
    }

    try {
        const switchMount = await characterService.switchMount(characterId, mountId);
        return res.status(200).json(switchMount);
    } catch (error: any) {
        console.error("Error in switching mount:", error);
        return res.status(500).json({ error: 'Failed to switch mount', errorMessage: error.message });
    }
});


export default characterRouter;
