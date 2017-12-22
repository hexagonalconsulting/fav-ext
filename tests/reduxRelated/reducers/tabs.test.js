import tabs from '../../../src/reduxRelated/reducers/tabs'
import updateSite, {toggleAutoRefresh} from "../../../src/reduxRelated/actions/index";
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
