import {
  UPDATE_SITE,
  DELETE_TAB_DATA
} from "../actions";

export default function (state = [], action) {
  let tabId;
  if (action._sender) {
    tabId = action._sender.tab.id;
  }

  switch (action.type) {

    case UPDATE_SITE:

      return [ ...state, tabId ];

    case DELETE_TAB_DATA:
      tabId = action.tabId;

      return state.filter( existentTabId => existentTabId !== tabId);

    default:

      return state;

  }

};