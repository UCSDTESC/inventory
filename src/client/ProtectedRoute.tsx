import React from 'react';
import { Route, useHistory, RouteProps } from 'react-router';
import useUser from './data/user';

const ProtectedRoute: React.FunctionComponent<RouteProps> = (props) => {
  
  const user = useUser();
  const history = useHistory();

  if (!user) {
    history.push('/');
  }

  return (
    <Route {...props}>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;