import React from 'react'
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button'

const CustomizedToggle = ({ popUpMessage, description, value, onToggle }) => (
  <div title={popUpMessage}>
    {description}:{' '}
    <div style={{ display: 'inline-block' }}>
      <ToggleButton
        value={ value }
        onToggle={ onToggle }
      />
    </div>
  </div>
);

CustomizedToggle.propTypes = {
  popUpMessage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CustomizedToggle;