'use strict';

const _ = require('lodash');
const errors = require('../../config/constants/errors');
const User = require('../../firebase/database/user');

const InitHandler = {
  handle: (socket, connectedUsers, data) => {
    console.log('Socket init request received!', data);

    if (!InitHandler.isValidData(data)) {
      console.log('Init requested without providing userId/username!');
      socket.emit('socket_error', errors.E_INVALID_DATA_PROVIDED);
      return;
    }

    InitHandler.updateConnectedUser(socket, connectedUsers, data);
    User.setOnlineStatus(data.userId, true);

    socket.emit('init_successful', {
      success: true,
      message: 'You are connected to the socket!',
      iceServers: app.locals.config.iceServers
    });
  },

  isValidData: (data) => {
    return data.userId && data.username;
  },

  updateConnectedUser: (socket, connectedUsers, data) => {
    let connectedUser = _.find(connectedUsers, (connectedUser) => connectedUser.userId === data.userId);

    if (!connectedUser) {
      connectedUser = {};
      connectedUser.userId = data.userId;
      connectedUser.username = data.username;
      connectedUser.sockets = [];
      connectedUsers.push(connectedUser);
    }

    if (_.indexOf(connectedUser.sockets, socket.id) === -1) {
      connectedUser.sockets.push(socket.id);
    }

    console.log('Connected users updated!', connectedUsers);
  }
};

module.exports = InitHandler;
