import {combineReducers} from 'redux';

import count from './count';
import domains from './domains';

export default combineReducers({
  count,
  domains
});