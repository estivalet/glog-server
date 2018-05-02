var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/box', (req, res) => {
    res.render('glogbox');
});

router.get('/a2600', (req, res) => {
    res.render('a2600');
});


module.exports = router;
