import React from 'react';
import { Route, useHistory, RouteProps } from 'react-router';
import useAdmin from './data/admin';

const ProtectedRoute: React.FunctionComponent<RouteProps> = (props) => {
  
  const admin = useAdmin();
  const history = useHistory();

  if (!admin) {
    history.push('/login');
    return <div></div>
  }

  return (
    <Route {...props}>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;