export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';
function asyncWatchForClosedTab(action) {
    return function (dispatch, getState) {
        console.log('state', getState());
        console.log('dispatch', dispatch);
        console.log(action);
        return {
            type: 'hello'
        }
    }
}

export function setListenerWatchForTabClosed (action) {
    return asyncWatchForClosedTab(action)
}
