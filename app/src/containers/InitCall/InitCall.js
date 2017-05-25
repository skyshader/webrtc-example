import React, { Component } from 'react';
import { connect } from 'react-redux';

import VideoStreamsContainer from '../../containers/VideoStreams';
import UserMediaError from '../../components/UserMediaError';

import { updateIsInitiator, updatePeerConnection } from '../../actions';
import errors from '../../constants/errors';
import SocketHandler from '../../lib/webrtc/SocketHandler';
import PeerConnection from '../../lib/webrtc/PeerConnection';

class InitCallContainer extends Component {
  componentWillReceiveProps(nextProps) {
    console.log("InitCall receives new props!");
    if (
      this.props.webRTC !== null &&
      nextProps.webRTC.peerConnection === null
    ) {
      this.setupPeerConnection();
    }
  }

  componentDidMount() {
    this.setupPeerConnection();
  }

  setupPeerConnection() {
    console.log("Creating peer connection...!");
    let peerConnection = PeerConnection.create();
    this.props.onUpdatePeerConnection(peerConnection);

    console.log("Peer connection created, sending handshake...!");
    SocketHandler.sendHandshake();
    this.props.onUpdateIsInitiator(true);
  }

  getView() {
    return this.props.webRTC.peerConnection ?
      <VideoStreamsContainer /> :
      <UserMediaError error={errors.WAITING_FOR_PEER} />;
  }

  render() {
    return (this.getView());
  }
}

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(InitCallContainer);
