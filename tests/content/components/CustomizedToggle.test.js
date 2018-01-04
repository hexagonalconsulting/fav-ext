import React from 'react'
import CustomizedToggle from '../../../src/content/components/CustomizedToggle'
import ToggleButton from 'react-toggle-button'
// this configuration code has to run in order to configure the enzyme adapter.
import  '../../enzymeConfig'
import renderer from 'react-test-renderer'
import { render } from 'enzyme';

describe('CustomizedToggle', () =>{

    test('renders the given description', () => {
      const componentWrapper = render(
        <CustomizedToggle
          description={'my description'}
          popUpMessage={'my popup message'}
          value={false}
          onToggle={() => {}}
        />
      );
      expect(componentWrapper.text()).toContain('my description:')
    });

    test('it calls the function is given when the ToggleButton (the checkbox) is clicked', () => {

      const  mockOnToggle = jest.fn();

      const component = renderer.create(
        <CustomizedToggle
          description={'my description'}
          popUpMessage={'my popup message'}
          value={false}
          onToggle={mockOnToggle}
        />
      );

      let tree = component.toJSON();

      const Toggle = tree.children[3];
      const firstChild = Toggle.children[0];
      const checkbox = firstChild.children[2];

      checkbox.props.onClick();
      expect(mockOnToggle).toBeCalled()
    });

});

describe('ToggleButton', () => {

  test('it calls the function is given', () => {

    const  mockOnToggle = jest.fn();

    const component = renderer.create(
      <ToggleButton
        value={true}
        onToggle={() => mockOnToggle() }
      />
    );

    let tree = component.toJSON();

    const checkbox = tree.children[2];

    checkbox.props.onClick();

    expect(mockOnToggle).toBeCalled()

  });

  describe('it sets the value is given', () => {

    test('the value is set to true', () => {

      const component = renderer.create(
        <ToggleButton
          value={true}
        />
      );

      let tree = component.toJSON();
      const checkbox = tree.children[2];

      expect(checkbox.props.value).toEqual(true)

    });

    test('the value is set to false', () => {

      const component = renderer.create(
        <ToggleButton
          value={false}
        />
      );

      let tree = component.toJSON();

      const checkbox = tree.children[2];

      expect(checkbox.props.value).toEqual(false)

    });
  });

});