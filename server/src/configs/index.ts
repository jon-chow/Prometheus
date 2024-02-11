import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const CONFIGS = {
  api: {
    version: 'v1'
  },
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    pingInterval: 10000
  }
};

export default CONFIGS;
