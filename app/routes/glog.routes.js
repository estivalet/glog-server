var express = require('express');
var router = express.Router();
var glog_controller = require('../controllers/glog.controller');

router.get('/', glog_controller.index);

router.post('/retropie/send/:systemName', glog_controller.sendSystemToRetropie);

router.get('/box', (req, res) => {
    res.render('glogbox');
});

router.get('/box2', (req, res) => {
    res.render('box2');
});

module.exports = router;
