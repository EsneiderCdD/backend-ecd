import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ error: 'Nombre y mensaje son requeridos' });
        }

        const newFeedback = await Feedback.create({ name, message });
        res.status(201).json(newFeedback);
    } catch (error) {
        console.error('Error creando feedback:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
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
