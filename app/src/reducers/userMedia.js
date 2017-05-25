import { UPDATE_USER_MEDIA_SUPPORT, UPDATE_USER_MEDIA_PERMISSION } from '../constants/actionTypes';
import errors from '../constants/errors';

const initialState = {
  error: errors.USER_MEDIA_PERMISSION_NOT_GRANTED,
  userMediaSupported: false,
  userMediaPermissionGranted: false
};

export default function userMedia(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_MEDIA_SUPPORT:
      return Object.assign({}, state, { userMediaSupported: action.isSupported });

    case UPDATE_USER_MEDIA_PERMISSION:
      return Object.assign({}, state, {
        error: action.data.error,
        userMediaPermissionGranted: action.data.isGranted
      });

    default:
      return state;
  }
}
