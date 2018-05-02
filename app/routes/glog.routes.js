var express = require('express');
var router = express.Router();
var glog_controller = require('../controllers/glog.controller');

router.get('/systems', glog_controller.listSystems);

module.exports = router;