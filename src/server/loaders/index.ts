import * as express from 'express';
import ExpressLoader from './ExpressLoader';
import RoutesLoader from './RoutesLoader';
import { Logger } from '@Config/Logger';

export default class ApplicationLoader {
  public static async InitialiseLoaders(app: express.Application) {
    // const mongoose = await MongooseLoader.initialiseLoader(app);

    await ExpressLoader.initialiseLoader(app);
    Logger.info('Initialised Express Server');

    // await PassportLoader.initialiseLoader(app);
    // Logger.info('Initialised Passport');

    await RoutesLoader.initialiseLoader(app);
    Logger.info('Initialised Routes');

    return;
  }
}