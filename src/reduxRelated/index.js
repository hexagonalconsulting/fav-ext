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