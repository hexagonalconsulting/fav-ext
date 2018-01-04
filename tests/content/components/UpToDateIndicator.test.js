import React from 'react'
import renderer from 'react-test-renderer';
import UpToDateIndicator from '../../../src/content/components/UpToDateIndicator'

test('shows the loader when there is a null value in the timestamps', () => {
  const component = renderer.create(
    <UpToDateIndicator
      timestampsAreEqual={false}
      timestampsNeitherIsNull={false}
    />
  );
  expect(component).toMatchSnapshot()
});

test('shows the loader when both timestamps are null', () => {
  const component = renderer.create(
    <UpToDateIndicator
      timestampsAreEqual={true}
      timestampsNeitherIsNull={false}
    />
  );
  expect(component).toMatchSnapshot()
});

test('shows the tab is "UP TO DATE" if the timestamps are equal', () => {
  const component = renderer.create(
    <UpToDateIndicator
      timestampsAreEqual={true}
      timestampsNeitherIsNull={true}
    />
  );
  expect(component).toMatchSnapshot()
});

test('shows the tab is "NOT UP TO DATE" if the timestamps are not equal', () => {
  const component = renderer.create(
    <UpToDateIndicator
      timestampsAreEqual={false}
      timestampsNeitherIsNull={true}
    />
  );
  expect(component).toMatchSnapshot()
});