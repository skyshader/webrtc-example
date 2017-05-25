const DetectSupport = {
  isSupported: () => {
    return Promise.resolve(
      !!(
        // check for DOM
        navigator && window

        // check for getUserMedia
        && (
          navigator.getUserMedia
          || navigator.mediaDevices.getUserMedia
        )

        // check for HTML5 Video Element
        && document.createElement('video').canPlayType

        // check for RTCPeerConnection
        && RTCPeerConnection

        // check for WebSocket support
        && ('WebSocket' in window && window.WebSocket.CLOSING === 2)
      )
    );
  }
};

export default DetectSupport;
