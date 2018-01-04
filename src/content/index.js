import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Store} from 'react-chrome-redux';

import App from './components/App';

const proxyStore = new Store({portName: 'example'});

const anchor = document.createElement('div');
anchor.id = 'rcr-anchor';

document.body.insertBefore(anchor, document.body.childNodes[0]);

// this block makes sure that App is not render until the proxy store gets the initialState from the real store.
const unsubscribe = proxyStore.subscribe(() => {
  unsubscribe(); // make sure to only fire once
  render(
    <Provider store={proxyStore}>
      <App/>
    </Provider>
    , document.getElementById('rcr-anchor')
  );
});