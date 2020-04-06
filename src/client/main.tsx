import * as React from 'react';
import {render} from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from '~/styles';

render(    
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>, document.getElementById("app"));

// declare const module: any;
// if (module.hot) {
//   module.hot.accept('./App', () => render(<App />, document.getElementById("app")));
// }