import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import NewItemPage from './pages/NewItemPage';
import ItemPage from './pages/ItemPage';

const Routes: React.FunctionComponent = () => {

  return (
    <Switch>
      <Route exact={true} path="/">
        <HomePage />
      </Route>
      <Route exact={true} path="/login">
        <LoginPage />
      </Route>

      <ProtectedRoute exact={true} path="/admin">
        <AdminLayout>
          <AdminPage />
        </AdminLayout>
      </ProtectedRoute>

      <ProtectedRoute exact={true} path="/admin/new">
        <AdminLayout>
          <NewItemPage />
        </AdminLayout>
      </ProtectedRoute>

      <ProtectedRoute exact={true} path="/admin/item/:id">
        <AdminLayout>
          <ItemPage />
        </AdminLayout>
      </ProtectedRoute>

    </Switch>
  );
}

export default Routes;
