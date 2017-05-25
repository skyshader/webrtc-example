export default function DetectScreenShare() {
  const isChrome = !!navigator.webkitGetUserMedia;
  const ScreenShare = {};

  let screenCallback;

  ScreenShare.screen = {
    chromeMediaSource: 'desktop',

    getSourceId: function (callback) {
      if (!callback) throw '"callback" parameter is mandatory.';

      screenCallback = callback;
      window.postMessage('get-sourceId', '*');
    },

    isChromeExtensionAvailable: function (callback) {
      if (!callback) return;

      if (ScreenShare.screen.chromeMediaSource === 'desktop') {
        callback(true);
      }

      window.postMessage('are-you-there', '*');

      setTimeout(function () {
        if (ScreenShare.screen.chromeMediaSource === 'screen') {
          callback(false);
        }
        else callback(true);
      }, 2000);
    },

    onMessageCallback: function (data) {
      if (data === 'PermissionDeniedError') {
        ScreenShare.screen.chromeMediaSource = 'PermissionDeniedError';
        if (screenCallback) return screenCallback('PermissionDeniedError');
        else throw new Error('PermissionDeniedError');
      }

      if (data === 'rtcmulticonnection-extension-loaded') {
        ScreenShare.screen.chromeMediaSource = 'desktop';
      }

      if (data.sourceId) {
        ScreenShare.screen.sourceId = data.sourceId;
        if (screenCallback) screenCallback(ScreenShare.screen.sourceId);
      }
    }
  };

  if (window.postMessage && isChrome) {
    ScreenShare.screen.isChromeExtensionAvailable();
  }

  window.addEventListener('message', function (event) {
    if (event.origin !== window.location.origin) {
      return;
    }

    ScreenShare.screen.onMessageCallback(event.data);
  });

  return ScreenShare;
}
