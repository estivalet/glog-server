var express = require('express');
var router = express.Router();

// Require controller modules.
var machine_controller = require('../controllers/machineController');

router.get('/random', machine_controller.random);

router.get('/machines/:page', machine_controller.list);

router.get('/machine/:id', machine_controller.detail);

router.get('/machine/desc/:description/:page', machine_controller.searchByDescription);

router.get('/search', machine_controller.search);

router.get('/advsearch', machine_controller.advancedSearch);

router.post('/results', machine_controller.advancedSearchResults);

module.exports = router;