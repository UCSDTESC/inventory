import Loader from './Loader';
import * as express from 'express';
import * as admin from 'firebase-admin';
import { Config } from '@Config/index';

export default class FirebaseLoader extends Loader {
  public static async initialiseLoader(app: express.Application) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: `https://${Config.DatabaseName}.firebaseio.com`
    });
  }
}
