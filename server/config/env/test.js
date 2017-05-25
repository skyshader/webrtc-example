'use strict';

module.exports = {
  server: {
    port: process.env.SERVER_PORT || 3002,
    secure: process.env.SECURE_PROTOCOL || false,
    key_path: process.env.SSL_KEY_PATH || '',
    cert_path: process.env.SSL_CERT_PATH || '',
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
