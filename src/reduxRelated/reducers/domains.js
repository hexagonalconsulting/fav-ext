import {
  UPDATE_SITE,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA,
  SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT,
  SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT
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
    case SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT:

      const { tabId: tabIdWatchedForCloseEvent } = action;
      return {
        ...state,
      };

    case  SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT:

      const { tabId: tabIdWatchedForUpdatedEvent } = action;

      return {
        ...state,
      };

    default:

      return state;

  }

};