import rateLimit from 'express-rate-limit';

export const messageLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 3, 
    message: {
        success: false,
        message: 'Demasiadas solicitudes desde esta IP, por favor intenta de nuevo en 15 minutos.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export const feedbackLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3, 
    message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});
