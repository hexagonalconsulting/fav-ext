import { UPDATE_SITE } from '../actions/index'

export default function (state = {}, action) {

  switch (action.type) {

    case UPDATE_SITE:

      const {site, lastUpdated} = action;

      return {

        ...state,
        [site]: {
          lastUpdated
        }

      };

    default:

      return state;

  }

};