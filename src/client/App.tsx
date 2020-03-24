import React from 'react';
import { hot } from 'react-hot-loader'
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import { GlobalStyle } from './styles';

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes />
    </BrowserRouter>
  );
}


export default hot(module)(App);