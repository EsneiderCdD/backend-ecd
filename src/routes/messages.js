import express from 'express';
import {
    createMessage,
    getAllMessages,
    markMessageAsRead,
    deleteMessage
} from '../controllers/messageController.js';

const router = express.Router();

// POST /api/messages 
router.post('/', createMessage);

// GET /api/messages 
router.get('/', getAllMessages);

// PUT /api/messages/:id/read 
router.put('/:id/read', markMessageAsRead);

// DELETE /api/messages/:id 
router.delete('/:id', deleteMessage);

export default router;
