export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';
export const SET_LISTENER_WATCH_FOR_TAB_UPDATED  = 'SET_LISTENER_WATCH_FOR_TAB_UPDATED';
import {
  deleteTabData,
  setTabAsWatchedForTabClosedEvent,
  setTabAsWatchedForTabUpdatedEvent
} from './index'

function asyncWatchForClosedTab(action) {

  return function (dispatch, getState) {

    const state = getState();
    const { domains } = state;
    const { domain } = action;
    const {id: tabId } = action._sender.tab;

    // this set of variables is used to determine if  the boolean `watchedForCloseEvent` for this tabId
    // is present in the  redux state. Expressions with the structure: `(object || {})[property]`
    // are there to avoid errors caused by trying to read properties not existent in the related object,
    // double negations (!!) are there to take the boolean value if the result of the expression is undefined: !!undefined => false.
    const thereIsDomainData = !!(domains || {})[domain];
    const thereIsTabsData =  !!(thereIsDomainData &&  (domains[domain] || {})['tabs']);
    const thereIsDataForThisTab =  !!(thereIsTabsData &&  (domains[domain]['tabs'] || {})[tabId]);
    const tabIsAlreadyWatchedForCloseEvent =  !!(thereIsDataForThisTab &&  (domains[domain]['tabs'][tabId] || {})['watchedForCloseEvent']);

    if (!tabIsAlreadyWatchedForCloseEvent) {

        addListenerForTabCloseEvent({ tabId, dispatch, site: domain});
        dispatch( setTabAsWatchedForTabClosedEvent({ tabId, site: domain}) )

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

    const state = getState();
    const { domains } = state;
    const { domain } = action;
    const {id: tabId } = action._sender.tab;

    // this set of variables is used to determine if  the boolean `watchedForUpdatedEvent` for this tabId
    // is present in the  redux state. Expressions with the structure: `(object || {})[property]`
    // are there to avoid errors caused by trying to read properties not existent in the related object,
    // double negations (!!) are there to take the boolean value if the result of the expression is undefined: !!undefined => false.
    const thereIsDomainData = !!(domains || {})[domain];
    const thereIsTabsData =  !!(thereIsDomainData &&  (domains[domain] || {})['tabs']);
    const thereIsDataForThisTab =  !!(thereIsTabsData &&  (domains[domain]['tabs'] || {})[tabId]);
    const tabIsAlreadyWatchedForUpdatedEvent =  !!(thereIsDataForThisTab &&  (domains[domain]['tabs'][tabId] || {})['watchedForUpdatedEvent']);
    if (!tabIsAlreadyWatchedForUpdatedEvent) {

      addListenerForTabUpdatedEvent({ tabId, dispatch, domain});
      dispatch( setTabAsWatchedForTabUpdatedEvent({ tabId, domain}) )

    }
  }
}

export function setListenerWatchForTabUpdated(action) {
  return asyncWatchForTabUpdated(action)
}
