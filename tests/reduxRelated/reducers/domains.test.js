import domains from '../../../src/reduxRelated/reducers/domains'
import updateSite from '../../../src/reduxRelated/actions/index'
let  expectedNextState, previousState, action, reducerOutput;

describe('UPDATE_SITE  action', () =>{

  test('it updates the update site field in the  related domain object', () => {
    action = updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"});

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00"
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00"
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T19:43:24+01:00"
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});

