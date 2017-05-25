import React from 'react';
import { connect } from 'react-redux';

import CallButton from '../../components/CallButton';

import { updateIsInitiator, updatePeerConnection } from '../../actions';
import SocketHandler from '../../lib/webrtc/SocketHandler';
import PeerConnection from '../../lib/webrtc/PeerConnection';

function StartCallContainer({
  userMedia, streams, socketChannel,
  webRTC, onUpdateIsInitiator, onUpdatePeerConnection
})  {

  const enabled = !!(
    userMedia.userMediaPermissionGranted
    && socketChannel.isReady
    && streams.localStream
    && !webRTC.peerConnection
  );

  function startCallHandler() {
    if (!enabled) return;

    console.log("Creating peer connection...!");
    let peerConnection = PeerConnection.create();
    onUpdatePeerConnection(peerConnection);

    console.log("Peer connection created, sending handshake...!");
    SocketHandler.sendHandshake();
  }

  return (
    <div className="StartCall-Container Control-button">
      <CallButton buttonClickHandler={startCallHandler} type="start" enabled={enabled} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userMedia: state.userMedia,
    streams: state.streams,
    socketChannel: state.socketChannel,
    webRTC: state.webRTC
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateIsInitiator: (isInitiator) => {
      dispatch(updateIsInitiator(isInitiator))
    },

    onUpdatePeerConnection: (isInitiator) => {
      dispatch(updatePeerConnection(isInitiator))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(StartCallContainer);
