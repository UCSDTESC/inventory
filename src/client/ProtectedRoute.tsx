import React from 'react';
import { Route } from 'react-router';

const ProtectedRoute: React.FunctionComponent = (props) => {

  return (
    <Route>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;