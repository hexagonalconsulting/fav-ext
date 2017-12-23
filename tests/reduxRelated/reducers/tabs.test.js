import tabs from '../../../src/reduxRelated/reducers/tabs'
import updateSite, {
  toggleAutoRefresh,
  deleteTabData,
  setTabAsWatchedForTabClosedEvent,
  setTabAsWatchedForTabUpdatedEvent
} from "../../../src/reduxRelated/actions/index";
import { addTabInfoToAction } from './utils'
let  expectedNextState, previousState, action, reducerOutput;

describe('UPDATE_SITE  action', () =>{

  test('it adds the tabId object to the existing state data ( and preserves other tabId objects)', () => {

    action = addTabInfoToAction(updateSite({
      site: 'http://mydomain.com',
      lastUpdated: "2017-12-22T19:43:24+01:00",
    }));

    previousState = {
      '2': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    expectedNextState = {
      '2': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '1': {

      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it adds the tabId object if there is no data in the state', () => {

    action = addTabInfoToAction(updateSite({
      site: 'http://mydomain.com',
      lastUpdated: "2017-12-22T19:43:24+01:00",
    }));

    previousState = {};

    expectedNextState = {
      '1': {}
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it preserves existing data already present in the same tabId object', () => {

    action = addTabInfoToAction(updateSite({
      site: 'http://mydomain.com',
      lastUpdated: "2017-12-22T19:43:24+01:00",
    }));

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    expectedNextState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

});

describe('TOGGLE_AUTOREFRESH  action', () => {

  test('creates the autoRefresh field in the related tab object', () => {
    action = addTabInfoToAction(toggleAutoRefresh({
      autoRefresh: true,
    }));

    previousState = {
      '1': {
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    expectedNextState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

  test('updates the autoRefresh field in the related tab object', () => {
    action = addTabInfoToAction(toggleAutoRefresh({
      autoRefresh: false,
    }));

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    expectedNextState = {
      '1': {
        autoRefresh: false,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

  test('works and preserves other tab object data', () => {
    action = addTabInfoToAction(toggleAutoRefresh({
      autoRefresh: false,
    }));

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState = {
      '1': {
        autoRefresh: false,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  })

});

describe('DELETE_TAB_DATA  action', () => {

  test('works and preserves other tab object data', () => {

    action = addTabInfoToAction(deleteTabData({
      site: 'http://mydomain.com',
      tabId: 1
    }));

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState = {
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  })
});

describe('SET_TAB_AS_WATCHED_FOR_TAB_CLOSED_EVENT action', () => {

  test('updates the field watchedForCloseEvent in the related tab object to true', () => {

    action = setTabAsWatchedForTabClosedEvent({
      tabId: 1
    });

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState ={
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

  test('creates the field watchedForCloseEvent if does not exists in the related tab object, ands sets it to true', () => {

    action = setTabAsWatchedForTabClosedEvent({
      tabId: 1
    });

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState ={
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: true,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  })
});

describe('SET_TAB_AS_WATCHED_FOR_TAB_UPDATED_EVENT action', () => {

  test('updates the field watchedForUpdatedEvent in the related tab object to true', () => {

    action = setTabAsWatchedForTabUpdatedEvent({
      tabId: 1
    });

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState ={
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

  test('creates the field watchedForUpdatedEvent if does not exists in the related tab object, ands sets it to true', () => {

    action = setTabAsWatchedForTabUpdatedEvent({
      tabId: 1
    });

    previousState = {
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: false,
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    expectedNextState ={
      '1': {
        autoRefresh: true,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: true
      },
      '2': {
        autoRefresh: false,
        watchedForCloseEvent: false,
        watchedForUpdatedEvent: false
      }
    };

    reducerOutput = tabs(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });

});
