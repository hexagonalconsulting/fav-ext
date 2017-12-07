import { UPDATE_SITE, TOGGLE_AUTOREFRESH } from '../actions/index'

export default function (state = {}, action) {

  const { site } = action;

  switch (action.type) {

    case UPDATE_SITE:
      const { lastUpdated } = action;

      return {

        ...state,
        [site]: {
          lastUpdated,
          ...state[site]
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


    default:

      return state;

  }

};