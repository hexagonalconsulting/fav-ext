import React from 'react'
import PropTypes from 'prop-types';
import customizedPulseLoader from './customizedPulseLoader'
import TimeAgo from 'timeago-react'

const TimeStampPresenter = ({timeStamp, description}) => (
  <div style={{ width: 240}}>
    {description}:{' '}
    { !!timeStamp ? <TimeAgo datetime={timeStamp} locale='en' style={{ fontWeight: 'bold' }}/> : customizedPulseLoader }
  </div>
);

TimeStampPresenter.propTypes = {
  description: PropTypes.string.isRequired,
  timeStamp: PropTypes.string,
};

export default TimeStampPresenter;
