import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'react-chrome-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import updateDomainsData from './update/domains'
import {SET_LISTENER_WATCH_FOR_TAB_CLOSED, setListenerWatchForTabClosed} from "./actions/backgroundActions";


const aliases = {
  // this key is the name of the action to proxy, the value is the action
  // creator that gets executed when the proxied action is received in the
  // background.
  SET_LISTENER_WATCH_FOR_TAB_CLOSED : setListenerWatchForTabClosed
};



const store = createStore(
  rootReducer,
  applyMiddleware(
    alias(aliases),
    thunk
  )
);

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
