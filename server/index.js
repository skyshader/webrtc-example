'use strict';

require('dotenv').config();
global.app = require('./server');

const server = require('http').createServer(app);

require('./config/env');
require('./firebase/database');
require('./socket')(server);
require('./server/cleanup')(server);

const port = parseInt(app.locals.config.server.port, 10);

if (process.env.NODE_ENV === 'test') return;

server.listen(port);

console.log('Express app/socket started in ' + process.env.NODE_ENV + ' mode on port ' + port);
