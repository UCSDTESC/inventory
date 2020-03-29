import * as express from 'express';
import ExpressLoader from './ExpressLoader';
import RoutesLoader from './RoutesLoader';
import { Logger } from '@Config/Logger';
import FirebaseLoader from './FirebaseLoader';

export default class ApplicationLoader {
  public static async InitialiseLoaders(app: express.Application) {
    // const mongoose = await MongooseLoader.initialiseLoader(app);

    await ExpressLoader.initialiseLoader(app);
    Logger.info('Initialised Express Server');

    await FirebaseLoader.initialiseLoader(app);
    Logger.info('Initialised Firebase');

    await RoutesLoader.initialiseLoader(app);
    Logger.info('Initialised Routes');

    return;
  }
}