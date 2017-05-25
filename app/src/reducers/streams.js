import { UPDATE_LOCAL_STREAM, UPDATE_REMOTE_STREAM, UPDATE_CALL_ERROR } from '../constants/actionTypes';

const initialState = {
  localStream: null,
  remoteStream: null,
  showRemoteStream: false,
  error: null
};

export default function streams(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCAL_STREAM:
      return Object.assign({}, state, { localStream: action.stream });

    case UPDATE_REMOTE_STREAM:
      return Object.assign({}, state, { remoteStream: action.stream });

    case UPDATE_CALL_ERROR:
      return Object.assign({}, state, { error: action.error });

    default:
      return state;
  }
}
