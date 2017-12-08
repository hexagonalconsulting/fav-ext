export const UPDATE_SITE = 'UPDATE_SITE';
export const TOGGLE_AUTOREFRESH = 'TOGGLE_AUTOREFRESH';
export const TOGGLE_UPDATES_FROM_SITE = 'TOGGLE_UPDATES_FROM_SITE';

export default function updateSite({ site, lastUpdated }) {
  return {
    type: UPDATE_SITE,
    site,
    lastUpdated,
  }
}

export function toggleAutoRefresh({ site, autoRefresh }) {
  return {
    type: TOGGLE_AUTOREFRESH,
    site,
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