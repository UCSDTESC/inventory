import React, {useState, useEffect} from 'react';
import { hot } from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import Firebase, { FirebaseContext } from '~/firebase';
import * as firebase from 'firebase';
import AdminContext from './data/admin/context';
import {client as AdminApiClient} from '~/data/AdminApi';
import Loading from './components/Loading';
import { GlobalStyle } from '~/styles';

const App: React.FunctionComponent<{}> = (props) => {

  const firebase = new Firebase();
  const [user, setUser] = useState<firebase.User>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
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
    <BrowserRouter>
      <GlobalStyle />
      <FirebaseContext.Provider value={firebase}>
        <AdminContext.Provider value={user}>
          <Routes />
        </AdminContext.Provider>
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}

export default hot(module)(App);