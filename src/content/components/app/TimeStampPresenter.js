import React from 'react'
import customizedPulseLoader from './customizedPulseLoader'
import TimeAgo from 'timeago-react'

const TimeStampPresenter = ({timeStamp, description}) => (
  <div style={{ width: 240}}>
    {description}:{' '}
    { !!timeStamp ? <TimeAgo datetime={timeStamp} locale='en' style={{ fontWeight: 'bold' }}/> : customizedPulseLoader }
  </div>
);


export default TimeStampPresenter;
