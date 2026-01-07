import express from 'express';
import { createFeedback, getFeedbacks, deleteFeedback } from '../controllers/feedbackController.js';
import { feedbackLimiter } from '../middlewares/rateLimiter.js';
import { validateFeedback } from '../middlewares/validators/feedbackValidator.js';

const router = express.Router();

router.post('/', feedbackLimiter, validateFeedback, createFeedback);
router.get('/', getFeedbacks);
router.delete('/:id', deleteFeedback);

export default router;
