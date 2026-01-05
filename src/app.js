import express from 'express';
import cors from 'cors';
import messageRoutes from './routes/messages.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/messages', messageRoutes);

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
