import express, { Request, Response } from 'express';
import weaponService from '.././services/weapon.service'; // Adjust the import path as necessary
import { WeaponDTO } from '../types';

const weaponRouter = express.Router();

/**
 * @swagger
 * /weapons:
 *   post:
 *     summary: Create a new weapon
 *     tags: [Weapons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the weapon
 *                 example: Sword
 *               type:
 *                 type: string
 *                 description: The type of the weapon
 *                 example: Melee
 *     responses:
 *       201:
 *         description: Weapon created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Internal server error
 */
weaponRouter.post('/', async (req: Request, res: Response) => {
        try {
                const { name, type }: WeaponDTO = req.body;
                const newWeapon = await weaponService.createWeapon({ name, type });
                res.status(201).json(newWeapon);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /weapons/{id}:
 *   get:
 *     summary: Get a weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weapon
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully retrieved the weapon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       400:
 *         description: Invalid weapon ID
 *       500:
 *         description: Internal server error
 */
weaponRouter.get('/:id', async (req: Request, res: Response) => {
        try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                        return res.status(400).json({ status: 'error', errorMessage: 'Invalid weapon ID' });
                }

                const weapon = await weaponService.getWeaponById(id);
                res.status(200).json(weapon);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /weapons/{id}:
 *   put:
 *     summary: Update a weapon
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weapon
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               damage:
 *                 type: integer
 *                 description: The new damage value for the weapon
 *                 example: 15
 *               quality:
 *                 type: integer
 *                 description: The new quality value for the weapon
 *                 example: 75
 *     responses:
 *       200:
 *         description: Successfully updated the weapon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Weapon'
 *       400:
 *         description: Invalid weapon ID
 *       500:
 *         description: Internal server error
 */
weaponRouter.put('/:id', async (req: Request, res: Response) => {
        try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                        return res.status(400).json({ status: 'error', errorMessage: 'Invalid weapon ID' });
                }

                const { name, type, damage, quality }: WeaponDTO = req.body;
                const updatedWeapon = await weaponService.updateWeapon(id, { name, type, damage, quality });
                res.status(200).json(updatedWeapon);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /weapons/{id}:
 *   delete:
 *     summary: Delete a weapon by ID
 *     tags: [Weapons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the weapon
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Weapon deleted successfully
 *       400:
 *         description: Invalid weapon ID
 *       500:
 *         description: Internal server error
 */
weaponRouter.delete('/:id', async (req: Request, res: Response) => {
        try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                        return res.status(400).json({ status: 'error', errorMessage: 'Invalid weapon ID' });
                }

                await weaponService.deleteWeapon(id);
                res.status(204).send();
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /weapons:
 *   get:
 *     summary: Get all weapons
 *     tags: [Weapons]
 *     responses:
 *       200:
 *         description: Successfully retrieved all weapons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Weapon'
 *       500:
 *         description: Internal server error
 */
weaponRouter.get('/', async (req: Request, res: Response) => {
        try {
                const weapons = await weaponService.getAllWeapons();
                res.status(200).json(weapons);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

export default weaponRouter;
