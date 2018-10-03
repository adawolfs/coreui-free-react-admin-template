import './polyfill'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { App } from './App';
import { store } from './_helpers';
// disable ServiceWorker
// import registerServiceWorker from './registerServiceWorker';

// disable ServiceWorker
// registerServiceWorker();

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
