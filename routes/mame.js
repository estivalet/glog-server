var express = require('express');
var router = express.Router();

// Require controller modules.
var machine_controller = require('../controllers/machineController');

router.get('/', machine_controller.index);

router.get('/random', machine_controller.random);

module.exports = router;