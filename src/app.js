import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messages.js';
import feedbackRoutes from './routes/feedbacks.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/messages', messageRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({
        message: 'Backend ECD funcionando',
        endpoints: {
            messages: '/api/messages'
        }
    });
});

export default app;
