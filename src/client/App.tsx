import React, {useState, useEffect} from 'react';
import { hot } from 'react-hot-loader'
import {BrowserRouter, useHistory} from 'react-router-dom';
import Routes from './Routes';
import Firebase, { FirebaseContext } from '~/firebase';
import * as firebase from 'firebase';
import UserContext from './data/user/context';
import {client as AdminApiClient} from '~/data/AdminApi';
import Loading from './components/Loading';

const App: React.FunctionComponent<{}> = (props) => {


  const firebase = new Firebase();
  const [user, setUser] = useState<firebase.User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const history = useHistory();
  
  useEffect(() => {
    const unsubscribe = firebase.checkUserAuth((user: firebase.User) => {
      if (user) {
        user.getIdToken()
          .then(token => {
            AdminApiClient.defaults.headers['Authorization'] = `Bearer ${token}`
            setLoading(false);
          })
        ;
      } else {
        setLoading(false);
      }
      setUser(user);

    })

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <FirebaseContext.Provider value={firebase}>
        <UserContext.Provider value={user}>
          <Routes />
        </UserContext.Provider>
      </FirebaseContext.Provider>
    </>
  );
}


export default hot(module)(App);