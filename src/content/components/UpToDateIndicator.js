import React from 'react'
import PropTypes from 'prop-types';
import customizedPulseLoader from './customizedPulseLoader'


const UpToDateIndicator = ({timestampsNeitherIsNull, timestampsAreEqual}) => {

  let upToDateIndicatorColor;
  // Color code meanings, upToDateIndicatorColor will either be:
  //'#00C851' => green success
  //'#ffbb33' => orange warning
  timestampsNeitherIsNull && ( upToDateIndicatorColor = { color: timestampsAreEqual ? '#00C851' : '#ffbb33' });

  const UP_TO_DATE = 'UP TO DATE';
  const NOT_UP_TO_DATE = 'NOT UP TO DATE';

  return(
    <div style={ {...{ fontWeight: 'bold', width: 150, textAlign: 'center' }, ...upToDateIndicatorColor} }>
      { !timestampsNeitherIsNull && customizedPulseLoader /* Show the customizedPulseLoader as long either of the timestamps is null. */}
      { timestampsNeitherIsNull && (
        timestampsAreEqual
          ? UP_TO_DATE
          : NOT_UP_TO_DATE
        )
      }
    </div>
  )
};

UpToDateIndicator.propTypes = {
  timestampsNeitherIsNull: PropTypes.bool.isRequired,
  timestampsAreEqual: PropTypes.bool.isRequired,
};

export default UpToDateIndicator;