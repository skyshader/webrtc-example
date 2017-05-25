'use strict';

const initHandler = require('./init').handle;
const rtcHandler = require('./rtc').handle;
const disconnectHandler = require('./disconnect').handle;

module.exports = (socket, connectedUsers) => {

  console.log('A socket client got connected!', socket.id);

  socket.on('init', initHandler.bind(null, socket, connectedUsers));

  socket.on('pre_call_handshake', rtcHandler.bind(null, 'pre_call_handshake', socket, connectedUsers));

  socket.on('handshake_complete', rtcHandler.bind(null, 'handshake_complete', socket, connectedUsers));

  socket.on('handshake_dropped', rtcHandler.bind(null, 'handshake_dropped', socket, connectedUsers));

  socket.on('request_call', rtcHandler.bind(null, 'call_requested', socket, connectedUsers));

  socket.on('accept_call', rtcHandler.bind(null, 'call_accepted', socket, connectedUsers));

  socket.on('reject_call', rtcHandler.bind(null, 'call_rejected', socket, connectedUsers));

  socket.on('cancel_call', rtcHandler.bind(null, 'call_cancelled', socket, connectedUsers));

  socket.on('end_call', rtcHandler.bind(null, 'call_ended', socket, connectedUsers));

  socket.on('ongoing_call', rtcHandler.bind(null, 'call_ongoing', socket, connectedUsers));

  socket.on('ice_candidates', rtcHandler.bind(null, 'ice_candidates', socket, connectedUsers));

  socket.on('game_link', rtcHandler.bind(null, 'game_link', socket, connectedUsers));

  socket.on('game_left', rtcHandler.bind(null, 'game_left', socket, connectedUsers));

  socket.on('disconnect', disconnectHandler.bind(null, socket, connectedUsers));

};
