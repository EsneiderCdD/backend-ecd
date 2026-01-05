import express from 'express';
import {
    createMessage,
    getAllMessages,
    markMessageAsRead,
    deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

// POST /api/messages - Crear mensaje
router.post('/', createMessage);

// GET /api/messages - Obtener todos los mensajes
router.get('/', getAllMessages);

// PUT /api/messages/:id/read - Marcar como leído
router.put('/:id/read', markMessageAsRead);

// DELETE /api/messages/:id - Eliminar mensaje
router.delete('/:id', deleteMessage);

export default router;
