import {
  UPDATE_SITE
} from '../actions/index'

export default function (state = [], action) {

  const { site } = action;

  switch (action.type) {

    case UPDATE_SITE:

      return [...state, site];

    default:

      return state;

  }

};