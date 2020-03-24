import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import AdminPage from './pages/AdminPage';

const Routes: React.FunctionComponent = () => {

  return (
    <Switch>
      <Route exact={true} path="/">
        <div>
          homepage ahhahah
        </div>
      </Route>
      <Route exact={true} path="/admin">
        <AdminLayout>
          <AdminPage />
        </AdminLayout>
      </Route>
    </Switch>
  );
}

export default Routes;