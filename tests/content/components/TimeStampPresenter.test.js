import React from 'react'
import TimeStampPresenter from '../../../src/content/components/TimeStampPresenter'
// this configuration code has to run in order to configure the enzyme adapter.
import  '../../enzymeConfig'
import renderer from 'react-test-renderer';
import { render } from 'enzyme';
import timekeeper from 'timekeeper'

describe('TimeStampPresenter', () =>{

  beforeAll(() => {
    const instant = new Date('2017-12-27T01:00:00+01:00');
    return timekeeper.freeze(instant);
  });

  afterAll(() => {
    return timekeeper.reset();
  });

  describe('shows the time that has passed since the timestamp it receives', () => {

    test('10 minutes from the given timestamp', () => {
      const componentWrapper = render(
        <TimeStampPresenter
          description={'my description'}
          timeStamp={'2017-12-27T01:10:00+01:00'}
        />
      );
      expect(componentWrapper.text()).toEqual('my description: in 10 minutes')
    });

    test('1 hour from from the give timestamp', () => {
      const componentWrapper = render(
        <TimeStampPresenter
          description={'my description'}
          timeStamp={'2017-12-27T02:00:00+01:00'}
        />
      );
      expect(componentWrapper.text()).toEqual('my description: in 1 hour')
    });

    test('15 seconds from from the give timestamp', () => {
      const componentWrapper = render(
        <TimeStampPresenter
          description={'my description'}
          timeStamp={'2017-12-27T01:00:15+01:00'}
        />
      );
      expect(componentWrapper.text()).toEqual('my description: in 15 seconds')
    });

  });

  describe('when does not receive a timestamp string',  () => {

    test('still shows the description given', () => {
      const componentWrapper = render(
        <TimeStampPresenter
          description={'my description'}
          timeStamp={null}
        />
      );
      expect(componentWrapper.text()).toEqual('my description: ')
    });

    test('shows the loader', () => {
      const component = renderer.create(
        <TimeStampPresenter
          description={'my description'}
          timeStamp={null}
        />
      );
      expect(component).toMatchSnapshot()
    });

  });

});

