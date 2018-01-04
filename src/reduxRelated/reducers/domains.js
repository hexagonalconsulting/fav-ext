import {
  AUTO_UPDATE_SITE,
  UPDATE_SITE,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA,
  TOGGLE_SHOW_DEBUG_BAR
} from '../actions/index'

export default function (state = {}, action) {

  const { site } = action;
  let tabId;
  if(action._sender && action._sender.tab) {
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

    case AUTO_UPDATE_SITE:
      const { lastUpdated: lastUpdatedVal } = action;

      return {
        ...state,
        [site]: {
          ...state[site],
          lastUpdated: lastUpdatedVal,
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

      tabId = action.tabId;
      const filteredTabsIds = state[site].tabsIds.filter( (existentTabId) => existentTabId !== tabId);

      return {
        ...state,
        [site]: {
          ...state[site],
          tabsIds: filteredTabsIds
        }
      };


    case TOGGLE_SHOW_DEBUG_BAR:
      const { showDebugBar } = action;

      return {
        ...state,
        [site]: {
          ...state[site],
          showDebugBar,
        }
      };

    default:

      return state;

  }

};