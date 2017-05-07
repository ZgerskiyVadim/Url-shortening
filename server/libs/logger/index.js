'use strict';
const winston = require('winston');
const config = require('../../config');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: config.loggerFileName })
    ]
});

module.exports = logger;

