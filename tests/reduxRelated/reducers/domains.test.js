import domains from '../../../src/reduxRelated/reducers/domains'
import updateSite from '../../../src/reduxRelated/actions/index'
let  expectedNextState, previousState, action, reducerOutput;
import { addTabInfoToAction } from './utils'

describe('UPDATE_SITE  action', () =>{

  test('It updates the lastUpdated field in the related existent domain object.' +
     ' It also adds the tabId to the related domain object.', () => {
    action = addTabInfoToAction(
      updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"})
    );
    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1]
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T19:43:24+01:00",
        tabsIds: [1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });


  test('It creates the related domain object and adds the lastUpdated field and tabsIds fields on it.', () => {
    action = addTabInfoToAction(
      updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"})
    );
    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T19:43:24+01:00",
        tabsIds: [1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it adds the tabId to the related existent domain object existent tabsIds', () => {
    action = addTabInfoToAction(
      updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"})
    );

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T15:00:24+01:00",
        tabsIds: [3,4,5]
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T19:43:24+01:00",
        tabsIds: [3,4,5,1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});

