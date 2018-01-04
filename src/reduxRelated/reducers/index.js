import {combineReducers} from 'redux';
import domains from './domains';
import domainsIds from './domainsIds';
import tabs from './tabs';
import tabsIds from './tabsIds';

export default combineReducers({
  domains,
  domainsIds,
  tabs,
  tabsIds
});