import React, { PropTypes } from 'react';
import { browserDetails } from 'webrtc-adapter';
import UpArrowIcon from 'react-icons/lib/ti/arrow-up';
import VideoCameraIcon from 'react-icons/lib/fa/video-camera';
import './UserMediaError.css'

import propTypes from '../../constants/propTypes';

export default function UserMediaError({ error }) {

  function getBrowserSpecificHelper() {
    if (error.code !== 'USER_MEDIA_PERMISSION_NOT_GRANTED')
      return null;

    const helperClasses = 'UserMediaAccess-helper animated infinite tada ' + browserDetails.browser;
    return (
      <div className={helperClasses}>
        <span className="UserMediaAccess-up-arrow-icon">
          <UpArrowIcon />
        </span>
          <span className="UserMediaAccess-video-camera-icon">
          <VideoCameraIcon />
        </span>
      </div>
    );
  }

  return (
    <div className="UserMediaError">
      { getBrowserSpecificHelper() }
      <p className="UserMediaError-message">{error.message}</p>
      <p className="UserMediaError-description">{error.description}</p>
    </div>
  );
}

UserMediaError.propTypes = {
  error: PropTypes.shape(propTypes.errors).isRequired,
};
