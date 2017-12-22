import domainsId from '../../../src/reduxRelated/reducers/domainsIds'
import updateSite from '../../../src/reduxRelated/actions/index'
let  expectedNextState, previousState, action, reducerOutput;

describe('UPDATE_SITE  action', () =>{

  test('it adds domainId into the empty domainsIds array', () => {
    action = updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"});

    previousState = [];

    expectedNextState = ['http://mydomain.com'];

    reducerOutput = domainsId(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it adds domainId into the existing domainsIds array', () => {
    action = updateSite({site: 'http://mydomain.com', lastUpdated: "2017-12-22T19:43:24+01:00"});

    previousState = ['http://otherdomain.com'];

    expectedNextState = [ 'http://otherdomain.com', 'http://mydomain.com'];

    reducerOutput = domainsId(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })



});

