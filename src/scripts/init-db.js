import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const createDb = async () => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('✅ Connected to PostgreSQL');
    const checkQuery = "SELECT 1 FROM pg_database WHERE datname = 'portafolio_ecd'";
    const res = await client.query(checkQuery);

    if (res.rows.length === 0) {
      await client.query('CREATE DATABASE portafolio_ecd');
      console.log('✅ Database "portafolio_ecd" created successfully.');
    } else {
      console.log('ℹ️ Database "portafolio_ecd" already exists.');
    }
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await client.end();
  }
};

createDb();
