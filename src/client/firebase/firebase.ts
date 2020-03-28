import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "inventory-1ada6.firebaseapp.com",
  databaseURL: "https://inventory-1ada6.firebaseio.com",
  projectId: "inventory-1ada6",
  storageBucket: "inventory-1ada6.appspot.com",
  messagingSenderId: "895162649274",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-FHVK8E97ZK"
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

  //checkUserAuth = (user: app.User) => this.auth.onAuthStateChanged(user)

  logout = () => this.auth.signOut();
}

export default Firebase;