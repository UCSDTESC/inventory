import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';
import * as express from 'express';
import * as admin from 'firebase-admin';

export class AdminAuthorisation implements ExpressMiddlewareInterface {
  async use(req: express.Request, res: express.Response, next?: express.NextFunction): Promise<any> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]);
      return next();
    } catch (err) {
      return next(new UnauthorizedError(err))
    }
  }
}

export default AdminAuthorisation;