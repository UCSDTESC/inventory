import React, {useState, useEffect} from 'react';
import { hot } from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import { GlobalStyle } from '~/styles';
import Firebase, { FirebaseContext } from '~/firebase';
import * as firebase from 'firebase';
import UserContext from './data/user/context';
import axios from 'axios';

const App: React.FunctionComponent<{}> = (props) => {


  const firebase = new Firebase();
  const [user, setUser] = useState<firebase.User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = firebase.checkUserAuth((user: firebase.User) => {
      setUser(user);

      if (user) {
        user.getIdToken()
          .then(token => axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
        ;
      }

      setLoading(false);
    })

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
        <FirebaseContext.Provider value={firebase}>
          <UserContext.Provider value={user}>
            <Routes />
          </UserContext.Provider>
        </FirebaseContext.Provider>
    </BrowserRouter>
  );
}


export default hot(module)(App);