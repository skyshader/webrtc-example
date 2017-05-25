import { UPDATE_CALL_SESSION } from '../constants/actionTypes';

const initialState = {
  from: null,
  to: null,
  room: null,
  token: null
};

export default function userMedia(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CALL_SESSION:
      return Object.assign({}, state, {
        from: action.session.from,
        to: action.session.to,
        room: action.session.room,
        token: action.session.token
      });

    default:
      return state;
  }
}
