import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import { useFirebase } from './firebase';

const Routes: React.FunctionComponent = () => {

  const firebase = useFirebase();

  useEffect(() => {
    async function getUser() {
      await firebase.getCurrentUser();
    }
    getUser();
  }, []);

  return (
    <Switch>
      {console.log(firebase.currentUser())}
      <Route exact={true} path="/">
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      </Route>
      <Route exact={true} path="/admin">
        <AdminLayout>
          <AdminPage />
        </AdminLayout>
      </Route>
      <Route exact={true} path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default Routes;
