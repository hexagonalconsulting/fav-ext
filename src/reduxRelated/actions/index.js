export const UPDATE_SITE = 'UPDATE_SITE';
export const TOGGLE_AUTOREFRESH = 'TOGGLE_AUTOREFRESH';
export const TOGGLE_UPDATES_FROM_SITE = 'TOGGLE_UPDATES_FROM_SITE';
export const DELETE_TAB_DATA = 'DELETE_TAB_DATA';
export const SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT = 'SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT';
export const SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT = 'SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT';

export default function updateSite({ site, lastUpdated }) {
  return {
    type: UPDATE_SITE,
    site,
    lastUpdated,
  }
}

export function toggleAutoRefresh({ autoRefresh }) {
  return {
    type: TOGGLE_AUTOREFRESH,
    autoRefresh,
  }
}

export function toggleAutoUpdate({ site, autoUpdate }) {
  return {
    type: TOGGLE_UPDATES_FROM_SITE,
    site,
    autoUpdate,
  }
}
export function deleteTabData({ site, tabId}) {
  return {
    type: DELETE_TAB_DATA,
    site,
    tabId,
  }
}

export function setTabAsWatchedForTabClosedEvent({ site, tabId}) {
  return {
    type: SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT,
    site,
    tabId,
  }
}

export function setTabAsWatchedForTabUpdatedEvent({ site, tabId}) {
  return {
    type: SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT,
    site,
    tabId,
  }
}