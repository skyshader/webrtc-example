'use strict';

module.exports = {
  setOnlineStatus: (userId, onlineStatus) => {
    const onlineUserRef = app.locals.db.ref('/chat/online_status/' + userId + '/');
    onlineUserRef.set(onlineStatus)
      .then(() => {
        console.log('User', userId, 'online status set successfully to', onlineStatus);
      })
      .catch(console.error);
  },

  getDeviceRegistrationId: (userId) => {
    const userRef = app.locals.db.ref('/devices-facebook/' + userId);
    return userRef.once('value')
      .then((dataSnapshot) => {
        if (!dataSnapshot.exists()) {
          throw new Error('Device id for ' + userId + ' does not exists!');
        }
        let versionStr;
        let deviceTokenStr;
        if (dataSnapshot.hasChildren()) {
          versionStr = dataSnapshot.child('version').val();
          deviceTokenStr = dataSnapshot.child('deviceToken').val();
        } else {
          versionStr = 'fcm';
          deviceTokenStr = dataSnapshot.val();
        }

        return ({
          version: versionStr,
          token: deviceTokenStr
        });
      });
  },

  addCallHistory(provider, data) {
    const callHistoryRef = app.locals.db.ref('/call-history/' + provider + '/');
    callHistoryRef.push(data)
      .then(() => {
        console.log('Call history added!', data);
      })
      .catch(console.error);
  }
};
