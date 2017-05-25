import {
  UPDATE_IS_INITIATOR,
  UPDATE_IS_ONGOING_CALL,
  UPDATE_PEER_CONNECTION,
  UPDATE_ICE_SERVERS,
  UPDATE_END_SESSION,
  QUEUE_ICE_CANDIDATE,
  RESET_ICE_CANDIDATES_QUEUE
} from '../constants/actionTypes';

const initialState = {
  isInitiator: false,
  isOngoingCall: false,
  peerConnection: null,
  iceServers: null,
  endSession: false,
  queuedCandidates: [],
};

export default function webRTC(state = initialState, action) {
  switch (action.type) {
    case UPDATE_IS_INITIATOR:
      return Object.assign({}, state, { isInitiator: action.isInitiator });

    case UPDATE_IS_ONGOING_CALL:
      return Object.assign({}, state, { isOngoingCall: action.isOngoingCall });

    case UPDATE_PEER_CONNECTION:
      return Object.assign({}, state, { peerConnection: action.peerConnection });

    case UPDATE_ICE_SERVERS:
      return Object.assign({}, state, { iceServers: action.iceServers });

    case UPDATE_END_SESSION:
      return Object.assign({}, state, { endSession: action.endSession });

    case QUEUE_ICE_CANDIDATE:
      return Object.assign({}, state, { queuedCandidates: [...state.queuedCandidates, action.candidate] });

    case RESET_ICE_CANDIDATES_QUEUE:
      return Object.assign({}, state, { queuedCandidates: [] });

    default:
      return state;
  }
}
