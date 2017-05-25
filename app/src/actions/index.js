import * as types from '../constants/actionTypes';

export const updateCallSession = (session) => ({
  type: types.UPDATE_CALL_SESSION, session
});

export const updateUserMediaSupport = isSupported => ({
  type: types.UPDATE_USER_MEDIA_SUPPORT, isSupported
});

export const updateUserMediaPermission = (data) => ({
  type: types.UPDATE_USER_MEDIA_PERMISSION, data
});

export const updateLocalStream = (stream) => ({
  type: types.UPDATE_LOCAL_STREAM, stream
});

export const updateRemoteStream = (stream) => ({
  type: types.UPDATE_REMOTE_STREAM, stream
});

export const updateCallError = (error) => ({
  type: types.UPDATE_CALL_ERROR, error
});

export const updateSocketChannel = (channel) => ({
  type: types.UPDATE_SOCKET_CHANNEL, channel
});

export const updateSocketChannelReady = (isReady) => ({
  type: types.UPDATE_SOCKET_CHANNEL_READY, isReady
});

export const resetSocketChannel = () => ({
  type: types.RESET_SOCKET_CHANNEL
});

export const updateIceServers = (iceServers) => ({
  type: types.UPDATE_ICE_SERVERS, iceServers
});

export const updateIsInitiator = (isInitiator) => ({
  type: types.UPDATE_IS_INITIATOR, isInitiator
});

export const updateIsOngoingCall = (isOngoingCall) => ({
  type: types.UPDATE_IS_ONGOING_CALL, isOngoingCall
});

export const updatePeerConnection = (peerConnection) => ({
  type: types.UPDATE_PEER_CONNECTION, peerConnection
});

export const updateEndSession = (endSession) => ({
  type: types.UPDATE_END_SESSION, endSession
});

export const queueIceCandidate = (candidate) => ({
  type: types.QUEUE_ICE_CANDIDATE, candidate
});

export const resetIceCandidatesQueue = () => ({
  type: types.RESET_ICE_CANDIDATES_QUEUE
});
