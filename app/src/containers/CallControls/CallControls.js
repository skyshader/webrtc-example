import React  from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import './CallControls.css';

import EndCallContainer from '../EndCall';
import ScreenShareContainer from '../ScreenShare';

function CallControlsContainer(props) {
  const classes = classNames('VideoCallControls', {
    shadowed: !!props.webRTC.peerConnection
  });

  function getCallButton() {
    if (props.webRTC.isOngoingCall) {
      return (
        <div className="CallControls-container">
          <EndCallContainer />
          <ScreenShareContainer/>
        </div>
      );
    }

    return null;
  }

  return (
    <div className={classes}>
      {getCallButton()}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    webRTC: state.webRTC
  }
};

export default connect(mapStateToProps)(CallControlsContainer);
