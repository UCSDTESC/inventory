import * as firebase from 'firebase-admin';
import { Config } from '.';

firebase.initializeApp({
  credential: firebase.credential.applicationDefault(),
  databaseURL: `https://${Config.DatabaseName}.firebaseio.com`
});

export default firebase