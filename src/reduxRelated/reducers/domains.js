import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA,
  SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT,
  SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT
} from '../actions/index'

export default function (state = {}, action) {

  const { site } = action;

  switch (action.type) {

    case UPDATE_SITE:
      const { lastUpdated } = action;

      return {
        ...state,
      };

    case TOGGLE_AUTOREFRESH:
      const tabId = action._sender.tab.id;
      const { autoRefresh } = action;
      return {
        ...state,
      };

    case TOGGLE_UPDATES_FROM_SITE:
      const { autoUpdate } = action;

      return {
        ...state,
      };

    case DELETE_TAB_DATA:

      const { tabId: tabIdToDelete } = action;

        return {
          ...state,
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