import express from 'express';
import { QuestDTO } from '../types';
import questService from '.././services/quest.service';

const questRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Quests
 *   description: Quest management API
 */

/**
 * @swagger
 * /quests/{id}:
 *   get:
 *     summary: Retrieve a quest by ID
 *     tags: [Quests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quest ID
 *     responses:
 *       200:
 *         description: Quest retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quest'
 *       404:
 *         description: Quest not found
 *       500:
 *         description: Failed to retrieve quest
 */
questRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const quest = await questService.getQuestById(parseInt(id, 10));
        if (!quest) {
            return res.status(404).json({ message: `Quest with id ${id} not found` });
        }
        res.status(200).json(quest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /quests:
 *   post:
 *     summary: Create a new quest
 *     tags: [Quests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestDTO'
 *     responses:
 *       201:
 *         description: Quest created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quest'
 *       400:
 *         description: Invalid data
 *       500:
 *         description: Failed to create quest
 */
questRouter.post('/', async (req, res) => {
    try {
        const { title, description, xp, reward } =  req.body;
        const quest = await questService.createQuest({ title, description, xp, reward });
        res.status(201).json(quest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /quests/{id}:
 *   delete:
 *     summary: Delete a quest by ID
 *     tags: [Quests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quest ID
 *     responses:
 *       200:
 *         description: Quest deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quest'
 *       404:
 *         description: Quest not found
 *       500:
 *         description: Failed to delete quest
 */
questRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const quest = await questService.deleteQuest(parseInt(id, 10));
        res.status(200).json(quest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /quests:
 *   get:
 *     summary: Retrieve a list of all quests
 *     tags: [Quests]
 *     responses:
 *       200:
 *         description: Quests retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Quest'
 *       500:
 *         description: Failed to retrieve quests
 */
questRouter.get('/', async (req, res) => {
    try {
        const quests = await questService.getAllQuests();
        res.status(200).json(quests);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /quests/{id}:
 *   put:
 *     summary: Update a quest by ID
 *     tags: [Quests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Quest ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/QuestDTO'
 *     responses:
 *       200:
 *         description: Quest updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Quest'
 *       400:
 *         description: Invalid data
 *       404:
 *         description: Quest not found
 *       500:
 *         description: Failed to update quest
 */
questRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data: QuestDTO = req.body;
    try {
        const quest = await questService.updateQuest(parseInt(id, 10), data);
        res.status(200).json(quest);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default questRouter;
