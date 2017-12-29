import React from 'react'
import { App } from '../../../src/content/components/App'
import sinon from 'sinon'
// this configuration code has to run in order to configure the enzyme adapter.
import  '../../enzymeConfig'
import { mount } from 'enzyme';
import renderer from 'react-test-renderer'

function mountWithMockedDispatch(mockedDispatch) {
  mount(
    <App
      autoUpdate={false}
      lastUpdated={null}
      tabs={{'1': []}}
      tabsIds={[1]}
      dispatch={mockedDispatch}
      domain={"https://mydomian.com"}
      showDebugBar={true}
    />
  );
}

describe('App', () => {

  describe('calls all setup functions on componentDidMount()', () => {

    beforeAll(() => {

      // sets up a fake dumb chrome instance.
      global.chrome = {
        runtime: {
          sendMessage: function () {}
        }
      };

      sinon.spy(App.prototype,'requestTabId' );
      sinon.spy(App.prototype,'fetchAppLastUpdatedTimestamp' );
      sinon.spy(App.prototype,'watchForThisTabOnCloseEvent' );
      sinon.spy(App.prototype,'watchForThisTabOnUpdatedEvent' );

      mountWithMockedDispatch( function() {} )

    });

    test('calls requestTabId()', () => {

      expect(App.prototype.requestTabId.calledOnce).toBe(true)

    });

    test('calls fetchAppLastUpdatedTimestamp()', () => {

      expect(App.prototype.fetchAppLastUpdatedTimestamp.calledOnce).toBe(true)

    });

    test('calls watchForThisTabOnCloseEvent()', () => {

      expect(App.prototype.watchForThisTabOnCloseEvent.calledOnce).toBe(true)

    });

    test('calls watchForThisTabOnUpdatedEvent()', () => {

      expect(App.prototype.watchForThisTabOnUpdatedEvent.calledOnce).toBe(true)

    })

  });

  describe('dispatches actions related to setting listeners for tab events', () => {

    test('SET_LISTENER_WATCH_FOR_TAB_UPDATED', () => {
      const mockedDispatch = jest.fn();
      mountWithMockedDispatch(mockedDispatch);
      const  action = { type: 'SET_LISTENER_WATCH_FOR_TAB_CLOSED', domain: "https://mydomian.com" };
      expect(mockedDispatch).toBeCalledWith(action)
    });

    test('SET_LISTENER_WATCH_FOR_TAB_CLOSED', () => {
      const mockedDispatch = jest.fn();
      mountWithMockedDispatch(mockedDispatch);
      const  action = { type: 'SET_LISTENER_WATCH_FOR_TAB_UPDATED', domain: "https://mydomian.com" };
      expect(mockedDispatch).toBeCalledWith(action)
    });

  });

  describe('App only appears if `showDebugBar` is true ', () => {

    test('does renders the debug bar if `showDebugBar` is true', () => {

      const component = renderer.create(
        <App
          autoUpdate={false}
          lastUpdated={null}
          tabs={{'1': []}}
          tabsIds={[1]}
          dispatch={function(){}}
          domain={"https://mydomian.com"}
          showDebugBar={true}
        />
      );

      let tree = component.toJSON();
      expect(tree).not.toBe(null)

    });

		test('renders null if `showDebugBar` is false', () => {

			const component = renderer.create(
				<App
					autoUpdate={false}
					lastUpdated={null}
					tabs={{'1': []}}
					tabsIds={[1]}
					dispatch={function(){}}
					domain={"https://mydomian.com"}
					showDebugBar={false}
				/>
			);

			let tree = component.toJSON();
			expect(tree).toBe(null)

		});

		test('renders null if `showDebugBar` is undefined', () => {

			let consoleErrorMessage;
			const CONSOLE_ERROR_MESSAGE =
				'Warning: Failed prop type: The prop `showDebugBar` is marked as required in `App`, but its value is `undefined`.'
				+ '\n' + '    in App';
			// All this does is prepare to catch the console error message mocking the implementation.
			const consoleSpy = jest.spyOn(console, 'error').mockImplementation((message) => consoleErrorMessage = message);

			const component = renderer.create(
				<App
					autoUpdate={false}
					lastUpdated={null}
					tabs={{'1': []}}
					tabsIds={[1]}
					dispatch={function(){}}
					domain={"https://mydomian.com"}
				/>
			);

			let tree = component.toJSON();

			expect(consoleSpy).toHaveBeenCalled();
			consoleSpy.mockRestore();
			expect(consoleErrorMessage).toEqual(CONSOLE_ERROR_MESSAGE);
			expect(tree).toBe(null)

		});
  });

});