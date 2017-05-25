export default function captureUserMedia(DetectRTCShare, onStreamApproved, onStreamDenied) {
  const screen_constraints = {
    mandatory: {
      chromeMediaSource: DetectRTCShare.screen.chromeMediaSource,
      maxWidth: 1920,
      maxHeight: 1080,
      minAspectRatio: 1.77
    },
    optional: []
  };

  if (DetectRTCShare.screen.chromeMediaSource === 'desktop' && !DetectRTCShare.screen.sourceId) {
    DetectRTCShare.screen.getSourceId(function (error) {
      if (error && error === 'PermissionDeniedError') {
        alert('PermissionDeniedError: User denied to share content of his screen.');
      }

      captureUserMedia(DetectRTCShare, onStreamApproved, onStreamDenied);
    });
    return;
  }

  if (DetectRTCShare.screen.chromeMediaSource === 'desktop') {
    screen_constraints.mandatory.chromeMediaSourceId = DetectRTCShare.screen.sourceId;
  }

  const session = {
    audio: false,
    video: screen_constraints
  };

  console.log(session);

  navigator.webkitGetUserMedia(session, onStreamApproved, onStreamDenied);
}
