'use strict';

const path = require('path');
const extend = require('util')._extend;

const development = require('./development');
const production = require('./production');
const test = require('./test');

const defaults = {
  root: path.join(__dirname, '../../')
};

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

app.locals.config = ({
  development: extend(development, defaults),
  test: extend(test, defaults),
  production: extend(production, defaults)
}[ process.env.NODE_ENV ]);
