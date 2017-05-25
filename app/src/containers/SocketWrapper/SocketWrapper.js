import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketIO from 'socket.io-client';

import UserMediaError from '../../components/UserMediaError';
import UserMediaAccess from '../UserMediaAccess';

import SocketHandler from '../../lib/webrtc/SocketHandler';
import { updateSocketChannel } from '../../actions';
import errors from '../../constants/errors';

class SocketWrapper extends Component {
  constructor(props) {
    super(props);

    this.channelUrl = "http://localhost:3001/";
  }

  componentDidMount() {
    const socketChannel = SocketIO.connect(this.channelUrl);
    this.registerSocketEvents(socketChannel);
    this.props.onSocketChannel(socketChannel);
  }

  registerSocketEvents(socketChannel) {
    socketChannel.on('connect', () => { SocketHandler.onConnect() });
    socketChannel.on('peer_offline', (data) => { SocketHandler.onPeerOffline(data) });
    socketChannel.on('init_successful', (data) => { SocketHandler.onInitSuccessful(data) });
    socketChannel.on('pre_call_handshake', (data) => { SocketHandler.onHandshake(data) });
    socketChannel.on('handshake_dropped', (data) => { SocketHandler.onHandshakeDropped(data) });
    socketChannel.on('handshake_complete', (data) => { SocketHandler.onHandshakeAcknowledge(data) });
    socketChannel.on('call_requested', (data) => { SocketHandler.onCallRequested(data) });
    socketChannel.on('call_accepted', (data) => { SocketHandler.onCallAccepted(data) });
    socketChannel.on('call_ended', (data) => { SocketHandler.onCallEnded(data) });
    socketChannel.on('ice_candidates', (data) => { SocketHandler.onIceCandidate(data) });
    socketChannel.on('socket_error', (data) => { SocketHandler.onSocketError(data) });
    socketChannel.on('disconnect', () => { SocketHandler.onDisconnect() });
  }

  getView() {
    return this.props.socketChannel.isReady ?
      <UserMediaAccess /> :
      <UserMediaError error={errors.SOCKET_CONNECTION_RETRY} />;
  }

  render() {
    return this.getView();
  }
}

const mapStateToProps = (state) => {
  return {
    socketChannel: state.socketChannel
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSocketChannel: (channel) => {
      dispatch(updateSocketChannel(channel))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SocketWrapper);
