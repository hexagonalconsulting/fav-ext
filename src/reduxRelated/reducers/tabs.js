import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
} from '../actions/index'

export default function (state = {}, action) {

  let tabId;
  if (action._sender) {
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

    default:

      return state;

  }

};