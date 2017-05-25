import React from 'react';
import { connect } from 'react-redux';

import CallButton from '../../components/CallButton';

import { updateEndSession, updateCallError } from '../../actions';
import PeerConnection from '../../lib/webrtc/PeerConnection';
import SocketHandler from '../../lib/webrtc/SocketHandler';
import errors from '../../constants/errors';

function EndCallContainer(props)  {

  function endCallHandler() {
    PeerConnection.reset();
    SocketHandler.sendEndCall();
    props.onEndSession(true);
    props.onCallError(errors.CALL_SESSION_ENDED);
  }

  return (
    <div className="EndCall-Container Control-button">
      <CallButton buttonClickHandler={endCallHandler} type="end" enabled={true} />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    webRTC: state.webRTC
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEndSession: (endSession) => {
      dispatch(updateEndSession(endSession))
    },

    onCallError: (error) => {
      dispatch(updateCallError(error));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EndCallContainer);
