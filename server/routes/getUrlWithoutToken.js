'use strict';
var express = require('express');
var router = express.Router();
var UrlCtrl = require('../controllers/url');

router.get('/urls', UrlCtrl.getAllUrl);

router.get('/url/:shortLink', UrlCtrl.redirectURl);

module.exports = router;