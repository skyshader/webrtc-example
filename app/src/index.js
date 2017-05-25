import 'webrtc-adapter';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RouteManager from './RouteManager';
import store from './store';
import './index.css';

ReactDOM.render(
  <Provider store={store} >
    <RouteManager />
  </Provider>,
  document.getElementById('root')
);
