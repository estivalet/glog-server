var express = require('express');
var router = express.Router();
var glog_controller = require('../controllers/glog.controller');

router.get('/', glog_controller.index);

router.get('/box', (req, res) => {
    res.render('glogbox');
});

router.get('/a2600', (req, res) => {
    res.render('a2600');
});


module.exports = router;
