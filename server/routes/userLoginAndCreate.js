'use strict';
var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');

router.post('/login', UserCtrl.loginUser);

router.post('/user', UserCtrl.createNewUser);

module.exports = router;