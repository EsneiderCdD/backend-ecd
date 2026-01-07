import { body } from 'express-validator';

export const validateMessage = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters')
        .escape(),

    body('proposalType')
        .trim()
        .notEmpty().withMessage('Proposal type is required')
        .escape(),

    body('contactType')
        .trim()
        .notEmpty().withMessage('Contact type is required')
        .isIn(['email', 'linkedin', 'phone', 'other', 'social']).withMessage('Invalid contact type')
        .escape(),

    body('contactValue')
        .trim()
        .notEmpty().withMessage('Contact value is required')
        .if(body('contactType').equals('email'))
        .isEmail().withMessage('Must be a valid email'),
    // Note: We are not escaping contactValue here to preserve URL formatting for 'social' types.
    // Output must be handled securely (e.g., standard React rendering).


    body('message')
        .trim()
        .notEmpty().withMessage('Message is required')
        .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters')
        .escape(),
];
