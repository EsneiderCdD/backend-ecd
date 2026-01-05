import dotenv from 'dotenv';
import app from './src/app.js';
import Message from './src/models/Message.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Inicializar BD y servidor
const startServer = async () => {
    try {
        // Crear tabla si no existe
        await Message.createTable();

        // Iniciar servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
            console.log(`📊 Endpoints disponibles:`);
            console.log(`   POST   http://localhost:${PORT}/api/messages`);
            console.log(`   GET    http://localhost:${PORT}/api/messages`);
            console.log(`   PUT    http://localhost:${PORT}/api/messages/:id/read`);
            console.log(`   DELETE http://localhost:${PORT}/api/messages/:id`);
        });
    } catch (error) {
        console.error('❌ Error iniciando servidor:', error);
        process.exit(1);
    }
};

startServer();
