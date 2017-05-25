import React from 'react';
import { connect } from 'react-redux';

import ScreenShareButton from '../../components/ScreenShareButton';
import DetectScreenShare from '../../lib/webrtc/DetectScreenShare';
import captureUserMedia from '../../lib/webrtc/CaptureUserMedia';

import { updateLocalStream } from '../../actions';

function ScreenShareContainer(props)  {

  function screenShareHandler() {
    const screenShare = DetectScreenShare();

    captureUserMedia(screenShare, (stream) => {
      props.onUpdateLocalStream(stream);
    }, (err) => {
      console.error('failed screen stream:', err);
    });
  }

  return (
    <div className="ScreenShare-Container Control-button">
      <ScreenShareButton buttonClickHandler={screenShareHandler} type="start" />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateLocalStream: (stream) => {
      dispatch(updateLocalStream(stream))
    }
  }
};

export default connect(null, mapDispatchToProps)(ScreenShareContainer);
