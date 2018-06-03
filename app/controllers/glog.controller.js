var request = require('request');
var async = require('async');

/**
 * Gets all necessary data to show in the index page.
 * @param {*} req 
 * @param {*} res 
 */
exports.index = function(req, res) {
    async.parallel({
        // Retrieve GLOG systems from the GLOGDB API.
        systems: function(callback) {
            request.get({
                url: 'http://localhost:3003/glog/system/all',
            }, function(error, response, body){
                if(error) {
                    callback(true, '{"error":"' + error + '"}');
                } else {
                    callback(null, body);
                }
            });    
        },
    }, function(err, results){
        if(err) {
            res.render('error', { message: JSON.parse(results.systems)});
        } else {
            res.render('index', 
                { title: 'GLOG'
                , systems: JSON.parse(results.systems) 
                });
        }
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.showSystem = function(req, res) {
    res.render('system', {name: req.params.systemName});
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.amControlPanel = function(req, res) {
    async.parallel({
        // Get GLOG_Categories.txt from ATTRACTMODE API.
        categories: function(callback) {
            request.get({
                url: 'http://localhost:3002/attract/categories/all',
            }, function(error, response, body){
                if(error) {
                    callback(true, '{"error":"' + error + '"}');
                } else {
                    callback(null, body);
                }
            });    
        },
    }, function(err, results){
        if(err) {
            res.render('error', { message: JSON.parse(results.systems)});
        } else {
            res.render('amcp', 
                { 
                 categories: JSON.parse(results.categories) 
                });
        }
    });
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.attract = function(req, res) {
    // Send a request to ATTRACTMODE API to read the romlist for the selected system and return it.
    console.log(req.params.systemName)
    request.get({
        url: 'http://localhost:3002/attract/romlist/' + req.params.systemName,
    }, function(error, response, body){
        var json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.sendSystemToRetropie = function(req, res) {
    // Send selected system to Retropie using API.
    request.post({
        url: 'http://localhost:3004/system/send/' + req.params.systemName,
        method: 'post',
        form: req.body,
    }, function(error, response, body){
        console.log('err=' + error);
        json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
    
 

};