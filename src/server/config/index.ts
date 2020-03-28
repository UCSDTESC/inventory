import { config } from 'dotenv';

config();

const NodeEnv = process.env.NODE_ENV || 'development';

export const Config = {
  Port: Number(process.env.PORT) || 3000,
  NodeEnv,
  WebConcurrency: process.env.WEB_CONCURRENCY || 1,
  IsDev: NodeEnv == 'development',
  DatabaseName: 'inventory-1ada6'
};

