import reducer from '../../../src/reduxRelated/reducers/index'
import initialState from '../../../src/reduxRelated/initialState'

test('initial state is the expected initial state if no state is provided to the reducer', () => {
  expect(reducer(undefined, {type: 'NONE'})).toEqual(initialState)
});