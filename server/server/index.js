'use strict';

const fs = require('fs');
const express = require('express');
const errors = require('../config/constants/errors');

const app = express();

app.use(function(req, res) {
  return res.status(404).json({
    success: false,
    error: errors.E_NOT_FOUND
  });
});

module.exports = app;
