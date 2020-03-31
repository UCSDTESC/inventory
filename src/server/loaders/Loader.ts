import * as Express from 'express';

export default abstract class Loader {
  public static async initialiseLoader(app: Express.Application): Promise<any> {
  }
}