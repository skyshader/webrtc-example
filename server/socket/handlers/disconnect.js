'use strict';

const _ = require('lodash');
const User = require('../../firebase/database/user');

const DisconnectHandler = {
  handle: (socket, connectedUsers) => {
    console.log('Client disconnected!', socket.id, connectedUsers);

    _.map(connectedUsers, (connectedUser) => {
      if (_.isEmpty(connectedUser.sockets)) return {};

      const sockets = _.filter(connectedUser.sockets, _ => _ !== socket.id);

      if (sockets.length === 0) {
        User.setOnlineStatus(connectedUser.userId, false);
      }

      connectedUser.sockets = sockets;
      return connectedUser;
    });

    console.log('Connected users:', connectedUsers);
  }
};

module.exports = DisconnectHandler;
