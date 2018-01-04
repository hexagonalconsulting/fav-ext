export const UPDATE_SITE = 'UPDATE_SITE';
export const AUTO_UPDATE_SITE = 'AUTO_UPDATE_SITE';
export const TOGGLE_AUTOREFRESH = 'TOGGLE_AUTOREFRESH';
export const TOGGLE_UPDATES_FROM_SITE = 'TOGGLE_UPDATES_FROM_SITE';
export const TOGGLE_SHOW_DEBUG_BAR = 'TOGGLE_SHOW_DEBUG_BAR';
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

export function autoUpdateSite({ site, lastUpdated }) {
  return {
    type: AUTO_UPDATE_SITE,
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

export function toggleShowDebugBar({ site, showDebugBar }) {
  return {
    type: TOGGLE_SHOW_DEBUG_BAR,
    site,
    showDebugBar,
  }
}

export function deleteTabData({ site, tabId}) {
  return {
    type: DELETE_TAB_DATA,
    site,
    tabId,
  }
}

export function setTabAsWatchedForTabClosedEvent({tabId}) {
  return {
    type: SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT,
    tabId,
  }
}

export function setTabAsWatchedForTabUpdatedEvent({ tabId }) {
  return {
    type: SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT,
    tabId,
  }
}