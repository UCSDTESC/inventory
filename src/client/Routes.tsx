import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import HomeLayout from './layouts/HomeLayout';
import ProtectedRoute from './ProtectedRoute';

const Routes: React.FunctionComponent = () => {

  return (
    <Switch>
      <Route exact={true} path="/">
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      </Route>
      <ProtectedRoute exact={true} path="/admin">
        <AdminLayout>
          <AdminPage />
        </AdminLayout>
      </ProtectedRoute>
      <Route exact={true} path="/login">
        <LoginPage />
      </Route>
    </Switch>
  );
}

export default Routes;
