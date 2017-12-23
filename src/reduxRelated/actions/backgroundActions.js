export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';
export const SET_LISTENER_WATCH_FOR_TAB_UPDATED  = 'SET_LISTENER_WATCH_FOR_TAB_UPDATED';
import {
  deleteTabData,
  setTabAsWatchedForTabClosedEvent,
  setTabAsWatchedForTabUpdatedEvent
} from './index'

function tabIsAlreadyWatchedForThatEvent( { tabs, tabsIds }, tabId, property) {

  return tabsIds.includes(tabId) ? !!tabs[tabId][property] : false;
}

function asyncWatchForClosedTab(action) {

  return function (dispatch, getState) {
    const {id: tabId } = action._sender.tab;

    const watchedForCloseEvent = tabIsAlreadyWatchedForThatEvent( getState(), tabId, 'watchedForCloseEvent');
    if ( !watchedForCloseEvent ) {

        const { domain } = action;
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
    const {id: tabId } = action._sender.tab;

    const watchedForUpdatedEvent = tabIsAlreadyWatchedForThatEvent( getState(), tabId, 'watchedForUpdatedEvent');

    if (!watchedForUpdatedEvent) {

      const { domain } = action;
      addListenerForTabUpdatedEvent({ tabId, dispatch, domain});
      dispatch( setTabAsWatchedForTabUpdatedEvent({ tabId }) )

    }
  }
}

export function setListenerWatchForTabUpdated(action) {
  return asyncWatchForTabUpdated(action)
}