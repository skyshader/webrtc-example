import React, { PropTypes } from 'react';
import classNames from 'classnames';
import VideoCameraIcon from 'react-icons/lib/fa/video-camera';
import './CallButton.css';

export default function CallButton({ buttonClickHandler, type, enabled }) {
  const classes = classNames('Call-button', {
    startCallButton: type === 'start',
    endCallButton: type === 'end'
  });

  return (
    <button onClick={buttonClickHandler} className={classes} disabled={!enabled}>
      <VideoCameraIcon />
    </button>
  );
}

CallButton.propTypes = {
  buttonClickHandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired
};
