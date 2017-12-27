import React from 'react'
import { App } from '../../../src/content/components/App'
import sinon from 'sinon'
// this configuration code has to run in order to configure the enzyme adapter.
import  '../../enzymeConfig'
import { mount } from 'enzyme';

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

      const fakeDispatch = function () {};
      return mount(
        <App
          autoUpdate={false}
          lastUpdated={null}
          tabs={{'1': []}}
          tabsIds={[1]}
          dispatch={fakeDispatch}
          domain={"https://mydomian.com"}
        />
      );

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

});