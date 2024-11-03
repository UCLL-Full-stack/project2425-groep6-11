import express, { Request, Response } from "express";
import { Mount } from '../domain/model/mount';
import mountService from '.././services/mount.service';

const mountRouter = express.Router();

/**
 * @swagger
 * /mounts:
 *   post:
 *     summary: Create a new mount
 *     tags:
 *       - Mounts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Dragon
 *     responses:
 *       201:
 *         description: Mount created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mount'
 *       500:
 *         description: Internal server error
 */
mountRouter.post('/', async (req: Request, res: Response) => {
        try {
                const { name } = req.body;
                const newMount = await mountService.createMount({ name });
                res.status(201).json(newMount);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /mounts/{id}:
 *   delete:
 *     summary: Delete a mount by ID
 *     tags:
 *       - Mounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the mount to delete
 *     responses:
 *       204:
 *         description: Mount deleted successfully
 *       400:
 *         description: Invalid mount ID
 *       404:
 *         description: Mount not found
 *       500:
 *         description: Internal server error
 */
mountRouter.delete('/:id', async (req: Request, res: Response) => {
        try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                        return res.status(400).json({ status: 'error', errorMessage: 'Invalid mount ID' });
                }

                const mount = await mountService.deleteMount(id);
                if (!mount) {
                        return res.status(404).json({ status: 'error', errorMessage: 'Mount not found' });
                }
                res.status(204).send();
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /mounts/{id}:
 *   get:
 *     summary: Get a mount by ID
 *     tags:
 *       - Mounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the mount to retrieve
 *     responses:
 *       200:
 *         description: Mount retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mount'
 *       400:
 *         description: Invalid mount ID
 *       404:
 *         description: Mount not found
 *       500:
 *         description: Internal server error
 */
mountRouter.get('/:id', async (req: Request, res: Response) => {
        try {
                const id = parseInt(req.params.id, 10);
                if (isNaN(id)) {
                        return res.status(400).json({ status: 'error', errorMessage: 'Invalid mount ID' });
                }
                const mount = await mountService.getMountById(id);
                if (!mount) {
                        return res.status(404).json({ status: 'error', errorMessage: 'Mount not found' });
                }
                res.status(200).json(mount);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /mounts:
 *   get:
 *     summary: Get all mounts
 *     tags:
 *       - Mounts
 *     responses:
 *       200:
 *         description: List of all mounts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Mount'
 *       500:
 *         description: Internal server error
 */
mountRouter.get('/', async (req: Request, res: Response) => {
        try {
                const mounts = await mountService.getAllMounts();
                res.status(200).json(mounts);
        } catch (error: any) {
                res.status(500).json({ status: 'error', errorMessage: error.message });
        }
});

/**
 * @swagger
 * /mounts/{id}:
 *   put:
 *     summary: Update a mount by ID
 *     tags:
 *       - Mounts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the mount to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pegasus
 *               speed:
 *                 type: number
 *                 example: 100
 *     responses:
 *       200:
 *         description: Mount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mount'
 *       400:
 *         description: Invalid mount ID
 *       500:
 *         description: Failed to update mount
 */
mountRouter.put('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid mount ID' });
        }

        try {
                const { name, speed } = req.body;
                const updatedMount = await mountService.updateMount(id, { name, speed });
                return res.status(200).json(updatedMount);
        } catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to update mount' });
        }
});

export default mountRouter;
