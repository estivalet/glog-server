var express = require('express');
var router = express.Router();

var index_controller = require('../controllers/indexController');

/* GET home page. */

// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

router.get('/', index_controller.index);


module.exports = router;
