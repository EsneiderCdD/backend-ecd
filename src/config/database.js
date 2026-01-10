import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in production');
}

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : undefined,
  host: isProduction ? undefined : process.env.DB_HOST,
  port: isProduction ? undefined : process.env.DB_PORT,
  database: isProduction ? undefined : process.env.DB_NAME,
  user: isProduction ? undefined : process.env.DB_USER,
  password: isProduction ? undefined : process.env.DB_PASSWORD,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export default pool;
