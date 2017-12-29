import React from 'react';
import {render} from 'react-dom';
import App from './components/app/App';
import {Store} from 'react-chrome-redux';
import {Provider} from 'react-redux';

let activeTabDomain;

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
	activeTabDomain =  `https://${new URL(tabs[0].url).hostname}`;
});

const proxyStore = new Store({
  portName: 'example'
});

// this block makes sure that App is not render until the proxy store gets the initialState from the real store.
const unsubscribe = proxyStore.subscribe(() => {
	unsubscribe(); // make sure to only fire once
  render(
      <Provider store={proxyStore}>
        <App domain={activeTabDomain} />
      </Provider>
    , document.getElementById('app')
  );
});