import {createStore, applyMiddleware} from 'redux';
import {wrapStore, alias} from 'react-chrome-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './reducers';
import updateDomainsData from './update/domains'
import {
  SET_LISTENER_WATCH_FOR_TAB_CLOSED,
  setListenerWatchForTabClosed,
  SET_LISTENER_WATCH_FOR_TAB_UPDATED,
  setListenerWatchForTabUpdated
} from "./actions/backgroundActions";
import initialState from  './initialState'

const aliases = {
  // this key is the name of the action to proxy, the value is the action
  // creator that gets executed when the proxied action is received in the
  // background.
  SET_LISTENER_WATCH_FOR_TAB_CLOSED : setListenerWatchForTabClosed,
  SET_LISTENER_WATCH_FOR_TAB_UPDATED : setListenerWatchForTabUpdated
};


const logger = createLogger({
  collapsed: true,
  diff: true,
});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    alias(aliases),
    thunk,
    logger
  ),
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
