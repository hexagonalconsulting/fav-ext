import tabsIds from '../../../src/reduxRelated/reducers/tabsIds'
import updateSite, {deleteTabData} from '../../../src/reduxRelated/actions/index'
import { addTabInfoToAction } from './utils'
let  expectedNextState, previousState, action, reducerOutput;


describe('UPDATE_SITE  action', () =>{

  test('adds the tabId to the array  present in the state', () => {

    action = addTabInfoToAction(updateSite({
      site: 'http://mydomain.com',
      lastUpdated: "2017-12-22T19:43:24+01:00",
    }));

    previousState = [2];

    expectedNextState = [2,1];

    reducerOutput = tabsIds(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('adds the tabId if the array in the state is empty', () => {

    action = addTabInfoToAction(updateSite({
      site: 'http://mydomain.com',
      lastUpdated: "2017-12-22T19:43:24+01:00",
    }));

    previousState = [];

    expectedNextState = [1];

    reducerOutput = tabsIds(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

});


describe('DELETE_TAB_DATA action', () =>{

  test('deletes the tabId from the array present in the state', () => {

    action = deleteTabData({
      site: 'http://mydomain.com',
      tabId: 1,
    });

    previousState = [2,1];

    expectedNextState = [2];

    reducerOutput = tabsIds(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)

  });
});