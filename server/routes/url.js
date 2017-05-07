'use strict';
var express = require('express');
var router = express.Router();
var UrlCtrl = require('../controllers/url');

router.post('/url', UrlCtrl.createUrl);

router.get('/url/byUser/:id', UrlCtrl.getAllUrlByUserId);

router.put('/url/:id', UrlCtrl.updateUrlById);

router.delete('/url/byUsera/:id', UrlCtrl.deleteUrlByUserId);

router.delete('/url/:id', UrlCtrl.deleteUrlById);

module.exports = router;