import * as React from 'react';
import {render} from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'

render(<App />, document.getElementById("app"));

declare const module: any;
if (module.hot) {
  module.hot.accept('./App', () => render(<App />, document.getElementById("app")));
}