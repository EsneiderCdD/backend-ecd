import helmet from 'helmet';

export const securityMiddleware = helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
        },
    },
    xssFilter: true, // XSS Protection
    noSniff: true,   // Prevent MIME sniffing
    hidePoweredBy: true, // Hide X-Powered-By header
    frameguard: { action: 'deny' }, // Clickjacking protection (iframe)
});
