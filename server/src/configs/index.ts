import { CorsOptions } from 'cors';
import { PoolConfig } from 'mariadb';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

interface APIConfig {
  version: string;
}

interface ServerOptions {
  host: string;
  port: number | string;
}

const CONFIGS = {
  api: {
    version: 'v1'
  } as APIConfig,
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4321',
    methods: ['GET'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 204
  } as CorsOptions,
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000
  } as ServerOptions,
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    pingInterval: 10000,
  } as PoolConfig
};

export default CONFIGS;
