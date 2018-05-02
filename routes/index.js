var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');

/* GET home page. */

// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/', index_controller.index);

router.get('/box', (req, res) => {
    res.render('glogbox');
});

router.get('/a2600', (req, res) => {
    res.render('a2600');
});


module.exports = router;
