'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const request = require('request');

const User = require('../database/user');

module.exports = {
  send: (userId, data, type) => {
    return User.getDeviceRegistrationId(userId)
      .then((devRegRecord) => {
        if (!devRegRecord) {
          throw new Error('No device ids found for user:', userId);
        }
        let requestUrl = '';
        let serverKey = '';
        if ('gcm' == devRegRecord.version) {
          requestUrl = app.locals.config.firebase.messaging.url_gcm;
          serverKey = app.locals.config.firebase.messaging.serverKey_gcm;
        } else {
          requestUrl = app.locals.config.firebase.messaging.url_fcm;
          serverKey = app.locals.config.firebase.messaging.serverKey_fcm;
        }
        const deviceToken = devRegRecord.token;
        console.log("user id: " + userId +" url:" + requestUrl);

        return new Promise((resolve, reject) => {
          request({
            url: requestUrl,
            method: 'POST',
            headers: {
              'Content-Type' :' application/json',
              'Authorization': 'key=' + serverKey
            },
            body: JSON.stringify(
              {
                "to" : deviceToken,
                "priority": "high",
                "data": {
                  "type": type,
                  "sender": data.from,
                  "receiver": data.to,
                  "token": data.token,
                },
                "time_to_live" : 30
              }
            )
          }, function(error, response, body) {
            console.log('Call posted to user: ' + userId + ' code:' + response.statusCode + ' response:'
              + response.statusMessage + '\n' + body + '\n' + '-end response-');
            if (error) {
              return reject(error);
            }

            if (response.statusCode >= 400) {
              return reject(new Error('HTTP Error: ' + response.statusCode + ' - ' + response.statusMessage + '\n' + body));
            }

            return resolve(body);
          });
        });
      });
  }
};
