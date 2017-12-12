import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA
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

    case DELETE_TAB_DATA:

      const { tabId: tabIdToDelete } = action;
      const deepCopyOfTabs = JSON.parse(JSON.stringify(state[site].tabs));

      // `delete` operator will return true on successful deletion, else false.
      if (delete deepCopyOfTabs[tabIdToDelete]) {

        return {
          ...state,
          [site]: {
            ...state[site],
            tabs: {
              ...deepCopyOfTabs // Which by this time in execution does not contain `tabIdToDelete`.
            }
          }
        };

      } else {
        throw `Something went wrong in the reducer, case DELETE_TAB_DATA:  deleting ${tabIdToDelete} from ${JSON.stringify(deepCopyOfTabsInState)}`;
      }

    default:

      return state;

  }

};