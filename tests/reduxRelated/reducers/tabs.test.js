import tabs from '../../../src/reduxRelated/reducers/tabs'
import updateSite from '../../../src/reduxRelated/actions/index'
let  expectedNextState, previousState, action, reducerOutput;

// in execution time the tab info will be added to the action data by react-chrome-redux logic,
// here we are just doing a minimal emulation of it.
function addTabInfoToAction(action) {
 return {
   ...action,
   ...{
     _sender: {
       tab: {
         id: 1
       }
     }
   }
 }
}

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
  })

});