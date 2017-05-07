'use strict';
var express = require('express');
var router = express.Router();
var UserCtrl = require('../controllers/user');


router.get('/user', UserCtrl.getAllUsers);

router.get('/user/:id', UserCtrl.getUserById);

router.put('/user/:id', UserCtrl.updateUserById);

router.delete('/user/:id', UserCtrl.deleteUserById);

module.exports = router;