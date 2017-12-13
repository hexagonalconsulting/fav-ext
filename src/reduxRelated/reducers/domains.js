import {
  UPDATE_SITE,
  TOGGLE_AUTOREFRESH,
  TOGGLE_UPDATES_FROM_SITE,
  DELETE_TAB_DATA,
  SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT
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
              ...state[site].tabs[tabId],
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

    case SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT:

      const tabsExists = !!( (state[site] || {} )['tabs'] );
      const { tabId: tabIdWatchedForCloseEvent } = action;
      const tabIdEntryExist = !!( tabsExists && (state[site]['tabs'] || {} )[tabIdWatchedForCloseEvent]);
      return {
        ...state,
        [site]: {
          ...state[site],
          tabs: {
            ...(tabsExists ? state[site]['tabs'] : {}),
            [tabIdWatchedForCloseEvent]: {
              ...(tabIdEntryExist ? state[site]['tabs'][tabIdWatchedForCloseEvent] : {} ),
              watchedForCloseEvent: true
            }
          }
        }
      };

    default:

      return state;

  }

};