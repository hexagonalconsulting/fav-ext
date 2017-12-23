import {
  UPDATE_SITE,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA
} from '../actions/index'

export default function (state = {}, action) {

  const { site } = action;
  let tabId;
  if(action._sender) {
    tabId = action._sender.tab.id;
  }

  switch (action.type) {

    case UPDATE_SITE:
      const { lastUpdated } = action;
      let existingTabIds;
      existingTabIds = state[site] ? [...state[site].tabsIds] : [];
      existingTabIds = existingTabIds.filter((existingtabId) => existingtabId !== tabId);

      return {
        ...state,
        [site]: {
          ...state[site],
          lastUpdated,
          tabsIds: [...existingTabIds, tabId]
        }
      };

    case TOGGLE_UPDATES_FROM_SITE:
      const { autoUpdate } = action;

      return {
        ...state,
        [site] : {
          ...state[site],
          autoUpdate
        }
      };

    case DELETE_TAB_DATA:

      const filteredTabsIds = state[site].tabsIds.filter( (existentTabId) => existentTabId !== tabId);

      return {
        ...state,
        [site]: {
          ...state[site],
          tabsIds: filteredTabsIds
        }
      };

    default:

      return state;

  }

};