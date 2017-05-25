export default {
  USER_MEDIA_NOT_SUPPORTED: {
    code: "RTC_USER_MEDIA_NOT_SUPPORTED",
    message: "Sorry, but your browser currently does not support our video app.",
    description: "We recommend you to install latest version of chrome or firefox to use this app."
  },

  SOCKET_CONNECTION_RETRY: {
    code: "SOCKET_CONNECTION_RETRY",
    message: "Connecting to the internet...",
    description: "Please wait, while we are trying to connect to the internet!"
  },

  USER_MEDIA_INVALID_CONSTRAINTS: {
    code: "USER_MEDIA_INVALID_CONSTRAINTS",
    message: "Invalid constraints provided to getUserMedia!",
    description: "Constraints should have audio and video properties!"
  },

  USER_MEDIA_PERMISSION_NOT_GRANTED: {
    code: "USER_MEDIA_PERMISSION_NOT_GRANTED",
    message: "Allow access to your audio/video devices to get started!",
    description: "Click on allow when asked for giving permissions to your audio/video devices!"
  },

  USER_MEDIA_NOT_FOUND: {
    code: "USER_MEDIA_NOT_FOUND",
    message: "We were not able to find the desired audio/video devices!",
    description: "Please check if you have proper drivers installed for your camera/microphone!"
  },

  USER_MEDIA_NOT_ALLOWED_ON_BROWSER: {
    code: "USER_MEDIA_NOT_ALLOWED_ON_BROWSER",
    message: "Your browser is not allowing us to access your audio/video devices.",
    description: "We recommend you to switch to either chrome or firefox else configure your browsers settings."
  },

  USER_MEDIA_NOT_ACCESSIBLE: {
    code: "USER_MEDIA_NOT_ACCESSIBLE",
    message: "Due to some reason we were not able to access your audio/video devices.",
    description: "Please check if your devices are already being used or restart your computer.",
  },

  USER_MEDIA_UNIDENTIFIED_ERROR: {
    code : "USER_MEDIA_UNIDENTIFIED_ERROR",
    message: "Due to some unknown reason we were not able to access your audio/video devices.",
    description: "Please try refreshing the page or restarting your computer."
  },

  WAITING_FOR_PEER: {
    code: "WAITING_FOR_PEER",
    message: "Waiting for someone to join the call!",
    description: "You're the only one here. Please wait till someone joins the call!"
  },

  CALL_SESSION_ENDED: {
    code: "CALL_SESSION_ENDED",
    message: "Your call has been ended!",
    description: "You've ended the current call. If you want to join again, refresh!"
  }
};
