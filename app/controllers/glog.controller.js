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