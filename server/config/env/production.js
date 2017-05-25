'use strict';

module.exports = {
  server: {
    port: 3000,
    secure: false,
    key_path: '',
    cert_path: ''
  },

  iceServers: {
    stun: {
      urls: ['stun:stun.services.mozilla.com', 'stun:stun.l.google.com:19302']
    }
  },

  firebase: {
    database: {
      cert: "credentials/firebase.json",
      url: "",
      version: "dev"
    },
    messaging: {
      serverKey_gcm: "",
      serverKey_fcm: "",
      url_fcm: "",
      url_gcm: "",
      restrictedPackageName: ""
    }
  }
};
