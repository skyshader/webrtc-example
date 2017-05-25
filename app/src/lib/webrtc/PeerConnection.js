import store from '../../store';
import SocketHandler from './SocketHandler';
import {
  updateLocalStream,
  updateRemoteStream,
  updatePeerConnection,
  updateIsOngoingCall,
  updateIsInitiator,
  updateCallError,
} from '../../actions';

const PeerConnection = {
  create: () => {
    const peerConfig = {
      iceServers: store.getState().webRTC.iceServers
    };

    const peerConnection = new RTCPeerConnection(peerConfig);
    peerConnection.onicecandidate = PeerConnection.onIceCandidateHandler;
    peerConnection.oniceconnectionstatechange = PeerConnection.onIceConnectionStateChange;
    peerConnection.onaddstream = PeerConnection.onAddStreamHandler;
    peerConnection.addStream(store.getState().streams.localStream);
    return peerConnection;
  },

  createOffer: () => {
    const peerConnection = store.getState().webRTC.peerConnection;
    return peerConnection.createOffer();
  },

  createAnswer: () => {
    const peerConnection = store.getState().webRTC.peerConnection;
    return peerConnection.createAnswer();
  },

  setLocalDescription: (sdp) => {
    const sessionDescription = new window.RTCSessionDescription(sdp);
    const peerConnection = store.getState().webRTC.peerConnection;
    return peerConnection.setLocalDescription(sessionDescription)
      .then(() => {
        return sdp;
      });
  },

  setRemoteDescription: (sdp) => {
    const sessionDescription = new window.RTCSessionDescription(sdp);
    const peerConnection = store.getState().webRTC.peerConnection;
    return peerConnection.setRemoteDescription(sessionDescription)
      .then(() => {
        return sdp;
      });
  },

  onIceCandidateHandler: (event) => {
    console.log("onIceCandidateHandler(): Candidate generated!");
    if (event.candidate) {
      const candidate = new RTCIceCandidate({ candidate: event.candidate.candidate });
      SocketHandler.sendIceCandidate(candidate);
    }
  },

  onIceConnectionStateChange: (event) => {
    console.log("onIceConnectionStateChange():", event);
    const peerConnection = store.getState().webRTC.peerConnection;
    if (peerConnection.iceConnectionState === "failed" ||
      peerConnection.iceConnectionState === "disconnected" ||
      peerConnection.iceConnectionState === "closed") {
      console.log("Peer connection disconnected/closed.");
      PeerConnection.reset();
    }
  },

  onAddStreamHandler: (event) => {
    console.log("onTrackHandler(): Received track!", event);
    if (event.stream) {
      store.dispatch(updateRemoteStream(event.stream));
      store.dispatch(updateCallError(null));
    }
  },

  reset: () => {
    PeerConnection.resetPeerConnection();
    PeerConnection.resetRemoteStream();
    store.dispatch(updateIsInitiator(false));
    store.dispatch(updateIsOngoingCall(false));
  },

  resetPeerConnection: () => {
    const peerConnection = store.getState().webRTC.peerConnection;
    if (peerConnection) {
      peerConnection.close();
      store.dispatch(updatePeerConnection(null));
    }
  },

  resetLocalStream: () => {
    const localStream = store.getState().streams.localStream;
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }

    store.dispatch(updateLocalStream(null));
  },

  resetRemoteStream: () => {
    const remoteStream = store.getState().streams.remoteStream;
    if (remoteStream) {
      remoteStream.getTracks().forEach(track => track.stop());
    }

    store.dispatch(updateRemoteStream(null));
  }
};

export default PeerConnection;
