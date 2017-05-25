import { UPDATE_SOCKET_CHANNEL, UPDATE_SOCKET_CHANNEL_READY, RESET_SOCKET_CHANNEL } from '../constants/actionTypes';

const initialState = {
  channel: null,
  isReady: false,
};

export default function socketChannel(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SOCKET_CHANNEL:
      return Object.assign({}, state, { channel: action.channel });

    case UPDATE_SOCKET_CHANNEL_READY:
      return Object.assign({}, state, { isReady: action.isReady });

    case RESET_SOCKET_CHANNEL:
      return Object.assign({}, state, { channel: null, isReady: false });

    default:
      return state;
  }
}
