import React, { Component } from 'react';
import { connect } from 'react-redux';

import InitCallContainer from '../InitCall';
import UserMediaError from '../../components/UserMediaError';

import { updateUserMediaPermission, updateLocalStream } from '../../actions';
import UserMedia from '../../lib/webrtc/UserMedia';
import errors from '../../constants/errors';

class UserMediaAccessContainer extends Component {
  componentDidMount() {
    this.setupUserMedia();
  }

  setupUserMedia() {
    return UserMedia.getUserMedia()
      .then((stream) => {
        this.props.onUserMediaPermission({
          error: null,
          isGranted: true
        });

        this.props.onLocalStream(stream);
      })
      .catch(error => {
        this.props.onUserMediaPermission({
          error,
          isGranted: false
        });
        console.error(error);
      });
  }

  getView() {
    let error = errors.USER_MEDIA_PERMISSION_NOT_GRANTED;
    if (this.props.webRTC.endSession) {
      error = errors.CALL_SESSION_ENDED;
    }

    return (
      this.props.userMedia.userMediaPermissionGranted &&
      this.props.streams.localStream &&
      !this.props.webRTC.endSession
    ) ?
      <InitCallContainer /> :
      <UserMediaError error={this.props.userMedia.error || error} />;
  }

  render() {
    return (this.getView());
  }
}

const mapStateToProps = (state) => {
  return {
    userMedia: state.userMedia,
    webRTC: state.webRTC,
    streams: state.streams
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserMediaPermission: (isSupported) => {
      dispatch(updateUserMediaPermission(isSupported))
    },
    onLocalStream: (stream) => {
      dispatch(updateLocalStream(stream))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMediaAccessContainer);
