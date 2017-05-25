'use strict';

const _ = require('lodash');
const errors = require('../../config/constants/errors');
const Messaging = require('../../firebase/messaging');
const User = require('../../firebase/database/user');

const RTCHandler = {
  handle: (emitType, socket, connectedUsers, data) => {
    console.log(emitType, data);
    if (RTCHandler.canEmit(emitType, socket, connectedUsers, data)) {
      RTCHandler.emitToRecipient(emitType, connectedUsers, data);
    }
  },

  canEmit: (emitType, socket, connectedUsers, data) => {
    if (!data.from || !data.to || !data.token) {
      console.log('RTC method requested without providing from/to/token!');
      socket.emit('socket_error', errors.E_INVALID_DATA_PROVIDED);
      return false;
    }

    const provider = data.provider || 'default';

    if (!_.find(connectedUsers, u => u.userId === data.to && !_.isEmpty(u.sockets))) {
      console.log('The receiver peer is not online!');
      socket.emit('peer_offline', errors.E_PEER_OFFLINE);

      // request FCM Server to notify offline peer if call requested
      if (emitType === 'pre_call_handshake' && provider !== 'nugget-genius') {
        Messaging.send(data.to, data, emitType)
          .then((response) => {
            console.log(response);
          })
          .catch(error => {
            console.error(error.message);
          });
      }

      return false;
    }

    if (emitType === 'call_accepted') {
      User.addCallHistory(provider, {
        from: data.from,
        to: data.to,
        time: Date.now(),
      });
    }

    return true;
  },

  emitToRecipient: (type, connectedUsers, data) => {
    const user = _.find(connectedUsers, u => u.userId === data.to);

   _.forEach(user.sockets, (socket_id) => {
      console.log('Sending signal about', type, ' to:', socket_id, data);
      app.locals.io.to(socket_id).emit(type, data);
    });
  }
};

module.exports = RTCHandler;
