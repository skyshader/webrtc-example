import React, { Component } from 'react';
import { connect } from 'react-redux';
import './VideoChat.css';

import UserMediaSupportContainer from '../../containers/UserMediaSupport';
import CallControlsContainer from '../../containers/CallControls';

import { updateCallSession } from '../../actions';

class VideoChat extends Component {

  componentDidMount() {
    const session = {
      from: this.props.params.from,
      to: this.props.params.to,
      room: this.props.params.from,
      token: "random-token"
    };

    this.props.updateCallSession(session);
  }

  render() {
    if (this.props.callSession.room) {
      return (
        <div className="VideoCallContainer">
          <UserMediaSupportContainer />
          <CallControlsContainer />
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    callSession: state.callSession
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCallSession: (session) => {
      dispatch(updateCallSession(session))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoChat);
