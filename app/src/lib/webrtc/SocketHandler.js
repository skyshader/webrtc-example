import store from '../../store';
import errors from '../../constants/errors';
import PeerConnection from './PeerConnection';
import {
  updateSocketChannelReady,
  resetSocketChannel,
  updateIceServers,
  updateIsInitiator,
  updateIsOngoingCall,
  queueIceCandidate,
  resetIceCandidatesQueue,
  updateCallError
} from '../../actions';


const SocketHandler = {
  onConnect: () => {
    const channel = store.getState().socketChannel.channel;
    const session = store.getState().callSession;
    if (channel) {
      channel.emit("init", {
        userId: session.from,
        username: session.from
      });
    }

    window.addEventListener("beforeunload", () => {
      SocketHandler.sendEndCall();
    });
  },

  onPeerOffline: (data) => {
    console.log("onPeerOffline(): Peer offline!", data);

    store.dispatch(updateIsInitiator(false));
    store.dispatch(updateCallError(errors.WAITING_FOR_PEER));
  },

  onInitSuccessful: (data) => {
    if (data.iceServers) {
      const iceServers = [
        {
          'urls': data.iceServers.stun.urls
        }
      ];
      store.dispatch(updateIceServers(iceServers));
      store.dispatch(updateSocketChannelReady(true));
    }
  },

  sendHandshake: () => {
    const channel = store.getState().socketChannel.channel;
    channel.emit("pre_call_handshake", store.getState().callSession);
  },

  onHandshake: (data) => {
    console.log("onHandshake(): Received handshake!", data);
    const channel = store.getState().socketChannel.channel;
    if (!store.getState().userMedia.userMediaPermissionGranted) {
      channel.emit("handshake_dropped", store.getState().callSession);
      return;
    }

    store.dispatch(updateCallError(null));
    channel.emit("handshake_complete", store.getState().callSession);
  },

  onHandshakeAcknowledge: (data) => {
    console.log("onHandshakeAcknowledge(): Acknowledge successful!", data);
    const channel = store.getState().socketChannel.channel;
    PeerConnection.createOffer()
      .then(PeerConnection.setLocalDescription)
      .then((sdp) => {
        console.log("Generated offer!");
        const offerData = Object.assign({}, store.getState().callSession, { offer: sdp });
        channel.emit("request_call", offerData);
      })
      .catch(console.error);
  },

  onHandshakeDropped: (data) => {
    console.log("onHandshakeDropped(): Handshake dropped!", data);

    store.dispatch(updateIsInitiator(false));
    store.dispatch(updateCallError(errors.WAITING_FOR_PEER));
  },

  onCallRequested: (data) => {
    console.log("onCallRequested(): Call request received!", data);
    if (!data.offer) {
      return;
    }

    const channel = store.getState().socketChannel.channel;
    PeerConnection.setRemoteDescription(data.offer)
      .then(() => {
        return PeerConnection.createAnswer();
      })
      .then(PeerConnection.setLocalDescription)
      .then((sdp) => {
        console.log("Generated answer!");
        const offerData = Object.assign({}, store.getState().callSession, { answer: sdp });
        channel.emit("accept_call", offerData);
      })
      .catch(console.error);
    store.dispatch(updateIsOngoingCall(true));
  },

  onCallAccepted: (data) => {
    console.log("onCallAccepted(): Call accepted!", data);
    if (!data.answer) {
      return;
    }

    PeerConnection.setRemoteDescription(data.answer);
    store.dispatch(updateIsOngoingCall(true));
  },

  sendEndCall: () => {
    const channel = store.getState().socketChannel.channel;
    PeerConnection.resetLocalStream();
    channel.emit("end_call", store.getState().callSession);
  },

  onCallEnded: (data) => {
    console.log("onCallEnded(): User disconnected!", data);
    PeerConnection.reset();
    store.dispatch(updateCallError(errors.WAITING_FOR_PEER));
  },

  sendIceCandidate: (candidate) => {
    console.log("sendIceCandidate(): Sending candidate!", candidate);
    const channel = store.getState().socketChannel.channel;
    const candidateData = Object.assign({}, store.getState().callSession, { candidate });
    channel.emit("ice_candidates", candidateData);
  },

  onIceCandidate: (data) => {
    console.log("onIceCandidate(): Ice candidate received!", data);
    if (!data.candidate) {
      return;
    }

    const peerConnection = store.getState().webRTC.peerConnection;
    if (peerConnection.remoteDescription) {
      console.log("Remote description set, adding candidate!");
      const queuedCandidates = store.getState().webRTC.queuedCandidates;
      if (queuedCandidates.length > 0) {
        console.log("Draining queued candidates!", queuedCandidates.length);
        for (let i = 0; i < queuedCandidates.length; i++) {
          peerConnection.addIceCandidate(new RTCIceCandidate(queuedCandidates[i]));
        }

        store.dispatch(resetIceCandidatesQueue());
      }

      peerConnection.addIceCandidate(new RTCIceCandidate(data.candidate));
    } else {
      console.log("Remote description not yet set, queueing candidate!");
      store.dispatch(queueIceCandidate(data.candidate));
    }
    },

  onSocketError: (error) => {
    console.error(error);
  },

  onDisconnect: () => {
    const socketChannel = store.getState().socketChannel;
    if (socketChannel.channel) {
      store.dispatch(resetSocketChannel());
      PeerConnection.resetLocalStream();
      PeerConnection.reset();
    }
  }
};

export default SocketHandler;
