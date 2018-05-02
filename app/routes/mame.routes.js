var express = require('express');
var router = express.Router();

// Require controller modules.
var machine_controller = require('../controllers/mame.controller');

router.get('/database', (req, res) => {
    res.render('mame/index');
});

router.get('/random', machine_controller.random);

router.get('/machines/:page', machine_controller.list);

router.get('/machine/:id', machine_controller.detail);

router.get('/machine/desc/:description/:page', machine_controller.searchByDescription);

router.get('/page/:page', machine_controller.gotoPage);

router.post('/results/:page', machine_controller.advancedSearchResults);

module.exports = router;