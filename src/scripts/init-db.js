import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const createDb = async () => {
  // Conectar a la base de datos por defecto 'postgres'
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres', // Conectamos a postgres para poder crear otras BD
  });

  try {
    await client.connect();
    console.log('🔌 Conectado a postgres...');

    // Verificar si existe la BD
    const checkQuery = "SELECT 1 FROM pg_database WHERE datname = 'portafolio_ecd'";
    const res = await client.query(checkQuery);

    if (res.rows.length === 0) {
      // Crear BD
        // Nota: CREATE DATABASE no se puede ejecutar en un bloque de transacción, así que lo hacemos directo
      await client.query('CREATE DATABASE portafolio_ecd');
      console.log('✅ Base de datos "portafolio_ecd" creada exitosamente.');
    } else {
      console.log('ℹ️ La base de datos "portafolio_ecd" ya existe.');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
};

createDb();
