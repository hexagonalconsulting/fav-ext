import React from 'react'
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

export default CustomizedToggle;