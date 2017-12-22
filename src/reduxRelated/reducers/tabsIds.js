import {UPDATE_SITE} from "../actions";

export default function (state = [], action) {
  let tabId;
  if (action._sender) {
    tabId = action._sender.tab.id;
  }

  switch (action.type) {
    case UPDATE_SITE:

      return [ ...state, tabId ];

    default:

      return state;

  }

};