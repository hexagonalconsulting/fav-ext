export const SET_LISTENER_WATCH_FOR_TAB_CLOSED   = 'SET_LISTENER_WATCH_FOR_TAB_CLOSED';

export function setListenerWatchForTabClosed (action) {
  console.log('enter setListenerWatchForTabClosed');
  console.log('action', action);
  return {
    type: 'hello'
  }
}
