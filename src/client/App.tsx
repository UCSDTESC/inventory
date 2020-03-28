import React from 'react';
import { hot } from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import { GlobalStyle } from '~/styles';
import Firebase, { FirebaseContext } from '~/firebase';

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <BrowserRouter>
        <GlobalStyle />
      <FirebaseContext.Provider value={new Firebase()}>
        <Routes />
      </FirebaseContext.Provider>
    </BrowserRouter>
  );
}


export default hot(module)(App);