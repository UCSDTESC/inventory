import { ExpressMiddlewareInterface, UnauthorizedError } from 'routing-controllers';
import * as express from 'express';
import firebaseAdmin from '@Config/firebase';

export class AdminAuthorisation implements ExpressMiddlewareInterface {
  async use(req: express.Request, res: express.Response, next?: express.NextFunction): Promise<any> {
    try {
      console.log(firebaseAdmin)
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(req.headers.authorization.split(' ')[1]);
      return next(decodedToken);
    } catch (err) {
      return next(new UnauthorizedError(err))
    }
  }
}

export default AdminAuthorisation;