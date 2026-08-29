import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const requiredEnv = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
export const isDatabaseConfigured = missingEnv.length === 0;

function unreachablePool(message) {
  return {
    async query() {
      const error = new Error(message);
      error.code = 'ENOTFOUND';
      throw error;
    },
    async end() {},
  };
}

export const pool = isDatabaseConfigured
  ? mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 10000,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  : unreachablePool(`Database is not configured yet (${missingEnv.join(', ')} missing)`);

export async function checkDatabaseConnection() {
  if (!isDatabaseConfigured) {
    throw new Error(`Database is not configured yet: ${missingEnv.join(', ')} missing`);
  }

  const [rows] = await pool.query(
    'SELECT DATABASE() AS databaseName, VERSION() AS version, CURRENT_USER() AS user'
  );

  return rows[0];
}
