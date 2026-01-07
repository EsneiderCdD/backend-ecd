import express from 'express';
import {
    createMessage,
    getAllMessages,
    markMessageAsRead,
    deleteMessage
} from '../controllers/messageController.js';
import { messageLimiter } from '../middlewares/rateLimiter.js';
import { validateMessage } from '../middlewares/validators/messageValidator.js';

const router = express.Router();

router.post('/', messageLimiter, validateMessage, createMessage);
router.get('/', getAllMessages);
router.put('/:id/read', markMessageAsRead);
router.delete('/:id', deleteMessage);

export default router;
