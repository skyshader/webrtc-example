import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserMediaError from '../../components/UserMediaError';
import SocketWrapper from '../SocketWrapper/SocketWrapper';

import { updateUserMediaSupport } from '../../actions';
import DetectSupport from '../../lib/webrtc/DetectSupport';
import errors from '../../constants/errors';

class UserMediaSupportContainer extends Component {
  componentDidMount() {
    DetectSupport.isSupported()
      .then(isSupported => {
        this.props.onUserMediaSupport(isSupported);
      })
      .catch(error => {
        this.props.onUserMediaSupport(false);
        console.error(error);
      });
  }

  getView() {
    return this.props.userMedia.userMediaSupported ?
      <SocketWrapper /> :
      <UserMediaError error={errors.USER_MEDIA_NOT_SUPPORTED} />;
  }

  render() {
    return this.getView();
  }
}

const mapStateToProps = (state) => {
  return {
    userMedia: state.userMedia
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUserMediaSupport: (isSupported) => {
      dispatch(updateUserMediaSupport(isSupported))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMediaSupportContainer);
