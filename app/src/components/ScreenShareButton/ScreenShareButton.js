import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ScreenShareIcon from 'react-icons/lib/md/screen-share';
import './ScreenShareButton.css';

export default function ScreenShareButton({ buttonClickHandler, type }) {
  const classes = classNames('ScreenShare-button', {
    startScreenShareButton: type === 'start',
    endScreenShareButton: type === 'end'
  });

  return (
    <button onClick={buttonClickHandler} className={classes}>
      <ScreenShareIcon />
    </button>
  );
}

ScreenShareButton.propTypes = {
  buttonClickHandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};
