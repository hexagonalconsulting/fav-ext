import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
  TOGGLE_UPDATES_FROM_SITE
} from '../actions/index'

export default function (state = {}, action) {

  const { site } = action;

  switch (action.type) {

    case UPDATE_SITE:
      const { lastUpdated } = action;

      return {

        ...state,
        [site]: {
          ...state[site],
          lastUpdated
        }

      };

    case TOGGLE_AUTOREFRESH:
      const tabId = action._sender.tab.id;
      const { autoRefresh } = action;
      return {
        ...state,
        [site]: {
          ...state[site],
          tabs: {
            ...state[site].tabs,
            [tabId]: {
              autoRefresh,
            }
          }
        }
      };

    case TOGGLE_UPDATES_FROM_SITE:
      const { autoUpdate } = action;

      return {
        ...state,
        [site]: {
          ...state[site],
          autoUpdate
        }
      };


    default:

      return state;

  }

};