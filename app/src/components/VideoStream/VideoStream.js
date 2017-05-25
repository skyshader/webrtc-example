import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './VideoStream.css';

export default function VideoStream({ stream, classes, muted, focused }) {
  const videoStreamClasses = classNames(classes, {
    VideoStream: true,
    focused: focused,
    nonFocused: !focused
  });

  return (
    <div className={videoStreamClasses} >
      <video
        className="streamingVideo"
        autoPlay
        muted={ muted }
        src={window.URL.createObjectURL(stream)}
      />
    </div>
  );
}

VideoStream.propTypes = {
  stream: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired
};
