import dotenv from 'dotenv';
import app from './src/app.js';
import Message from './src/models/Message.js';
import Feedback from './src/models/Feedback.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    try {
      await Message.createTable();
      await Feedback.createTable();
    } catch (err) {
      console.warn('⚠️ No se pudieron crear las tablas (probablemente ya existen)');
    }
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error iniciando servidor:', error);
    process.exit(1);
  }
};

startServer();
