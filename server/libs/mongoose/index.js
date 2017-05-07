'use strict';
const mongoose = require('mongoose');
const log = require('../logger/index');
const config = require('../../config');

mongoose.connect(config.dbName);
const db = mongoose.connection;

db.on('error', function (err) {
    log.error('Connection error:', err.message);
});
db.once('open', function callback() {
    log.info('Connected to DB!');
});

module.exports = db;
