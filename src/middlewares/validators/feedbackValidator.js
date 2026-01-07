import { body } from 'express-validator';

export const validateFeedback = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
        .escape(),

    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
        .escape(),
];
