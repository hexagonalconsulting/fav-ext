import {createStore} from 'redux';
import {wrapStore} from 'react-chrome-redux';
import rootReducer from './reducers';
import updateDomainsData from './update/domains'

const store = createStore(rootReducer, {});

wrapStore(store, {
  portName: 'example'
});

const updateIntervalId = setInterval( function () {
  updateDomainsData(store)
}, 1000);

// This just serves a response for the request of the the tabId requested from the component.
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.request === "get tabId") {
    sendResponse({tabId: sender.tab.id});
  }
});
