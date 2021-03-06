import domains from '../../../src/reduxRelated/reducers/domains'
import updateSite, {
  toggleAutoUpdate,
  deleteTabData,
  autoUpdateSite,
  toggleShowDebugBar
} from '../../../src/reduxRelated/actions/index'
let  expectedNextState, previousState, action, reducerOutput;
import { addTabInfoToAction } from './utils'

describe('UPDATE_SITE  action', () => {

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
  });

  test('it preserves data already present in the related existent domain object', () => {
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
        tabsIds: [3,4,5],
        showDebugBar: true,
        autoUpdate: false,
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T19:43:24+01:00",
        tabsIds: [3,4,5,1],
        showDebugBar: true,
        autoUpdate: false,
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});


describe('TOGGLE_UPDATES_FROM_SITE  action', () => {

  test('it creates the autoUpdate field in the related domain object' , () => {
    action = toggleAutoUpdate({
      site: 'http://mydomain.com',
      autoUpdate: true
    });

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
        autoUpdate: true,
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it updates the autoUpdate field in the related domain object' , () => {
    action = toggleAutoUpdate({
      site: 'http://mydomain.com',
      autoUpdate: false
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false,
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1],
        autoUpdate: true
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false
      },
      'http://mydomain.com': {
        autoUpdate: false,
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});

describe('DELETE_TAB_DATA action', () => {

  test('deletes tabId from related  domain object associated tabsIds', () => {

    action = deleteTabData({
        site: 'http://mydomain.com',
        tabId: 1
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false,
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1],
        autoUpdate: true
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [],
        autoUpdate: true
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('does preserve other ids present in the tabsIds array while deletes tabId', () => {

    action = deleteTabData({
        site: 'http://mydomain.com',
        tabId: 1
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false,
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1,3,4,5],
        autoUpdate: true
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        autoUpdate: false
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [3,4,5],
        autoUpdate: true
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});

describe('AUTO_UPDATE_SITE  action', () => {

  test('it creates the lastUpdated field in the related domain object', () => {
    action = autoUpdateSite({
      site: 'http://mydomain.com',
      lastUpdated: '2017-12-22T18:00:24+01:00'
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",

      },
      'http://mydomain.com': {
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",

      },
      'http://mydomain.com': {
        lastUpdated: '2017-12-22T18:00:24+01:00'
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it updates the lastUpdated field in the related domain object', () => {
    action = autoUpdateSite({
      site: 'http://mydomain.com',
      lastUpdated: '2017-12-22T18:00:24+01:00'
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",

      },
      'http://mydomain.com': {
        lastUpdated: '2017-12-22T17:00:24+01:00'
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
      },
      'http://mydomain.com': {
        lastUpdated: '2017-12-22T18:00:24+01:00'
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });


  test('it preserves data in other fields in the related domain object', () => {
    action = autoUpdateSite({
      site: 'http://mydomain.com',
      lastUpdated: '2017-12-22T18:00:24+01:00'
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",

      },
      'http://mydomain.com': {
        lastUpdated: '2017-12-22T17:00:24+01:00',
        tabsIds: [1,2,3,4],
        showDebugBar: true,
        autoUpdate: false,
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
      },
      'http://mydomain.com': {
        lastUpdated: '2017-12-22T18:00:24+01:00',
        tabsIds: [1,2,3,4],
        showDebugBar: true,
        autoUpdate: false,
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });
});

describe('TOGGLE_SHOW_DEBUG_BAR  action', () => {

  test('it creates the showDebugBar field in the related domain object, and preserves other  existent data' , () => {
    action = toggleShowDebugBar({
      site: 'http://mydomain.com',
      showDebugBar: true
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1],
        autoUpdate: false
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2]
      },
      'http://mydomain.com': {
        showDebugBar: true,
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1],
        autoUpdate: false
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  });

  test('it updates the showDebugBar field in the related domain object' , () => {
    action = toggleShowDebugBar({
      site: 'http://mydomain.com',
      showDebugBar: false
    });

    previousState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        showDebugBar: false,
      },
      'http://mydomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1],
        showDebugBar: true
      }
    };

    expectedNextState = {
      'http://otherdomain.com': {
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [2],
        showDebugBar: false
      },
      'http://mydomain.com': {
        showDebugBar: false,
        lastUpdated: "2017-12-22T18:00:24+01:00",
        tabsIds: [1]
      }
    };

    reducerOutput = domains(previousState, action);

    expect(reducerOutput).toEqual(expectedNextState)
  })

});
