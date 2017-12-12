export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';
function asyncWatchForClosedTab(action) {
    return function (dispatch, getState) {
        console.log('state', getState());
        console.log('dispatch', dispatch);
        console.log(action);
        const state = getState();
        const { domains } = state;
        const { domain } = action;
        const {id: tabId } = action._sender.tab;

        console.log('tabId', tabId);

        // this set of variables is used to determine if  the boolean `watchedForCloseEvent` for this tabId
        // is present in the  redux state. Expressions with the structure: `(object || {})[property]`
        // are there to avoid errors caused by trying to read properties not existent in the related object,
        // double negations (!!) are there to take the boolean value if the result of the expression is undefined: !!undefined => false.
        const thereIsDomainData = !!(domains || {})[domain];
        const thereIsTabsData =  !!(thereIsDomainData &&  (domains[domain] || {})['tabs']);
        const thereIsDataForThisTab =  !!(thereIsTabsData &&  (domains[domain]['tabs'] || {})[tabId]);
        const tabIsAlreadyWatchedForCloseEvent =  !!(thereIsDataForThisTab &&  (domains[domain]['tabs'][tabId] || {})['watchedForCloseEvent']);

        if (tabIsAlreadyWatchedForCloseEvent) {

            console.log('enter case: tabIsAlreadyWatchedForCloseEvent');
            console.log(tabIsAlreadyWatchedForCloseEvent)

        } else {

            console.log('enter case: !tabIsAlreadyWatchedForCloseEvent');
            console.log(tabIsAlreadyWatchedForCloseEvent)

        }
        return {
            type: 'hello'
        }
    }
}

export function setListenerWatchForTabClosed (action) {
    return asyncWatchForClosedTab(action)
}
