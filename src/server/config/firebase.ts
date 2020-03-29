import * as firebase from 'firebase-admin';
import { Config } from '.';

const app = firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: `https://${Config.DatabaseName}.firebaseio.com`
});
console.log("app", app)
export default app;