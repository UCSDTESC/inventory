import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

class Firebase {
  private auth: firebase.auth.Auth;
  private provider: app.auth.GoogleAuthProvider;

  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }

    this.auth = app.auth();
    this.provider = new app.auth.GoogleAuthProvider();
  }

  signInWithPopup = () => this.auth.signInWithPopup(this.provider)

  //TODO: figure out type signature for this callback
  checkUserAuth = (user: any) => this.auth.onAuthStateChanged(user)

  logout = () => this.auth.signOut();

  currentUser = () => this.auth.currentUser;

  getCurrentUser = () => {
    return new Promise<app.User|undefined>((resolve, reject) => {
       const unsubscribe = this.auth.onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
       }, reject);
    });
  }
}

export default Firebase;