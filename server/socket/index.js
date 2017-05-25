'use strict';

const socketIO = require('socket.io');
const socketHandler = require('./handlers');

module.exports = (server) => {
  app.locals.io = socketIO.listen(server);
  app.locals.io.origins('*:*');
  let connectedUsers = [];

  app.locals.io.on('connection', (socket) => socketHandler(socket, connectedUsers));
};
