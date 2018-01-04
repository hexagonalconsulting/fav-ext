import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
  DELETE_TAB_DATA,
  SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT,
  SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT
} from '../actions/index'

export default function (state = {}, action) {

  let tabId;
  if (action._sender && action._sender.tab) {
    tabId = action._sender.tab.id;
  }

  switch (action.type) {
    case UPDATE_SITE:

      return {
        ...state,
        [tabId]: {
          ...state[tabId]
        }
      };

    case TOGGLE_AUTOREFRESH:
      const { autoRefresh } = action;
      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          autoRefresh
        }
      };

    case DELETE_TAB_DATA:
      tabId = action.tabId;
      const nextState = {...state};
      delete nextState[tabId];
      return nextState;

    case SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT:

      tabId = action.tabId;

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          watchedForCloseEvent: true,
        }
      };

    case SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT:

      tabId = action.tabId;

      return {
        ...state,
        [tabId]: {
          ...state[tabId],
          watchedForUpdatedEvent: true,
        }
      };

    default:

      return state;

  }

};