var express = require('express');
var router = express.Router();

// Require controller modules.
var machine_controller = require('../controllers/machineController');

router.get('/random', machine_controller.random);

router.get('/machines/:page', machine_controller.list);

router.get('/machine/:id', machine_controller.detail);

router.get('/machine/desc/:description/:page', machine_controller.searchByDescription);

router.get('/page/:page', machine_controller.gotoPage);

router.post('/results/:page', machine_controller.advancedSearchResults);

router.get('/test', function(req, res) {
    const fct = require('../romlist-parser');
    let promise = fct.myfunction('Atari 2600.txt');
    return promise.then(result => {
        console.log(result);
       res.send(result);
    });
})

module.exports = router;