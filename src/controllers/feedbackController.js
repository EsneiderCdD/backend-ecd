import { validationResult } from 'express-validator';
import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: 'Validation Error',
                details: errors.array()
            });
        }

        const { name, message } = req.body;

        const newFeedback = await Feedback.create({ name, message });
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error creating feedback:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.getAll();
        res.json(feedbacks);
    } catch (error) {
        console.error('Error obteniendo feedbacks:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteFeedback = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFeedback = await Feedback.delete(id);

        if (!deletedFeedback) {
            return res.status(404).json({ error: 'Feedback no encontrado' });
        }

        res.json({ message: 'Feedback eliminado correctamente', feedback: deletedFeedback });
    } catch (error) {
        console.error('Error eliminando feedback:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
