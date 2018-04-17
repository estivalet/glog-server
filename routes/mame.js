var express = require('express');
var router = express.Router();

// Require controller modules.
var machine_controller = require('../controllers/machineController');

router.get('/random', machine_controller.random);

router.get('/machines/:page', machine_controller.list);

router.get('/machine/:id', machine_controller.detail);

router.get('/machine/desc/:description', machine_controller.searchByDescription);

router.get('/search', machine_controller.search);

module.exports = router;