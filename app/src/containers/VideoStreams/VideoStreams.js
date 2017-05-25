import React from 'react';
import { connect } from 'react-redux';
import './VideoStreams.css';

import VideoStream from '../../components/VideoStream';
import CallError from '../../components/CallError';

function VideoStreamsContainer({ streams }) {
  function getError() {
    if (streams.error) {
      return (
        <CallError message={streams.error.message} />
      );
    }

    return null;
  }

  console.log('rendering streams', streams);

  return (
    <div className="VideoStreamsContainer">
      <div className="VideoStreams-holder">
        {getError()}
        { streams.localStream &&
          <VideoStream
            stream={streams.localStream}
            classes="LocalStream"
            muted={true}
            focused={ !(!!streams.remoteStream) }
          />
        }
        { streams.remoteStream &&
          <VideoStream
            stream={streams.remoteStream}
            classes="RemoteStream"
            muted={false}
            focused={true}
          />
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    streams: state.streams
  }
};

export default connect(mapStateToProps)(VideoStreamsContainer);
