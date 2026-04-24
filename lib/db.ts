import mysql from 'mysql2/promise';

const globalForDb = global as unknown as { pool: mysql.Pool };

const poolConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'orion_cms',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 5000, // Slightly longer to avoid race issues
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

console.log('DEBUG: DB Config:', { ...poolConfig, password: '***' });

export const pool = globalForDb.pool || mysql.createPool(poolConfig);

if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool;
