'use strict';
var express = require('express');
var config = require('./config');
var log = require('./libs/logger');
require('./libs/mongoose');
var favicon = require('serve-favicon');
var userLoginAndCreate = require('./routes/userLoginAndCreate.js');
var urlGetAllById = require('./routes/getUrlWithoutToken');
var user = require('./routes/user.js');
var url = require('./routes/url.js');
var checkAccess = require('./libs/checkAccess/checkAccess.js');
var bodyParser = require('body-parser');
var app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.use(favicon(__dirname + '/../public/images/favicon.ico'));
app.use(userLoginAndCreate);
app.use(urlGetAllById);
app.use(checkAccess, url);
app.use(user);
app.use(function(err, req, res, next) {
    console.log(err);
    return res.status(err.status ? err.status : 500).json(err);
});

app.listen(config.port, function () {
    log.info('Server listen port' + config.port);
});
