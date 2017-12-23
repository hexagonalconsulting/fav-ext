export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';
export const SET_LISTENER_WATCH_FOR_TAB_UPDATED  = 'SET_LISTENER_WATCH_FOR_TAB_UPDATED';
import {
  deleteTabData,
  setTabAsWatchedForTabClosedEvent,
  setTabAsWatchedForTabUpdatedEvent
} from './index'

function asyncWatchForClosedTab(action) {

  return function (dispatch, getState) {

    const { tabs, tabsIds } = getState();
    const { domain } = action;
    const {id: tabId } = action._sender.tab;

    let tabIsAlreadyWatchedForCloseEvent = tabsIds.includes(tabId)
      ? !!tabs[tabId].watchedForCloseEvent
      : false;

    if (!tabIsAlreadyWatchedForCloseEvent) {

        addListenerForTabCloseEvent({ tabId, dispatch, site: domain});
        dispatch( setTabAsWatchedForTabClosedEvent({ tabId }) )

    }
  }
}

export function setListenerWatchForTabClosed (action) {
    return asyncWatchForClosedTab(action)
}

function addListenerForTabCloseEvent({ tabId, dispatch, site}) {
  chrome.tabs.onRemoved.addListener( (tabIdClosed) => {
    if (tabId === tabIdClosed) {
      dispatch(deleteTabData({ site, tabId}))
    }
  })
}

function addListenerForTabUpdatedEvent({ tabId, dispatch, domain}) {
  chrome.tabs.onUpdated.addListener( (tabIdUpdated, changedInfo) => {
    if (tabId === tabIdUpdated) {
      const {url, status} = changedInfo;
      if (
        typeof status === "string"  && // status exist as a string.
        typeof url    === "string"  && // url exists as a string.
        status        === "loading" && // we intercept only the loading status of the tab.
        !url.includes(domain)          // url does not contain the domain we are tracking.
      ){
        dispatch( deleteTabData( { site: domain, tabId} ) )
      }
    }
  })
}

function asyncWatchForTabUpdated(action) {
  return function (dispatch, getState) {

    const { tabs, tabsIds  } = getState();
    const { domain } = action;
    const {id: tabId } = action._sender.tab;

    let tabIsAlreadyWatchedForUpdatedEvent = tabsIds.includes(tabId)
      ? !!tabs[tabId].watchedForUpdatedEvent
      : false;

    if (!tabIsAlreadyWatchedForUpdatedEvent) {

      addListenerForTabUpdatedEvent({ tabId, dispatch, domain});
      dispatch( setTabAsWatchedForTabUpdatedEvent({ tabId }) )

    }
  }
}

export function setListenerWatchForTabUpdated(action) {
  return asyncWatchForTabUpdated(action)
}