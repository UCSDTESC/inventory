import { config } from 'dotenv';
import admin = require('firebase-admin');

config();

const NodeEnv = process.env.NODE_ENV || 'development';

export const Config = {
  Port: Number(process.env.PORT) || 3000,
  NodeEnv,
  WebConcurrency: process.env.WEB_CONCURRENCY || 1,
  IsDev: NodeEnv == 'development',
  DatabaseName: process.env.FIREBASE_PROJECT_ID,
  Firebase: {
    serviceAccount: {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    } as admin.ServiceAccount
  }
};

