'use strict';

const _ = require('lodash');

module.exports = (server) => {
  process.stdin.resume();

  function exitHandler(err) {
    if (err) {
      console.error(err.stack || err);
    }

    console.log('Exiting application... clearing states!');
    server.close();
    process.exit();
  }

  //do something when app is closing
  process.on('exit', exitHandler);

  //catches ctrl+c event
  process.on('SIGINT', exitHandler);

  //catches uncaught exceptions
  process.on('uncaughtException', exitHandler);
};
