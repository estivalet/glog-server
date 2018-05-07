var request = require('request');
var async = require('async');

exports.index = function(req, res) {
    async.parallel({
        systems: function(callback) {
            request.get({
                url: 'http://localhost:3003/glog/system/all',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    callback(null, body);
                }
            });    
        },
    }, function(err, results){
            res.render('index', 
                { title: 'GLOG'
                , error: err
                , systems: JSON.parse(results.systems) 
       });
    });
};

exports.showSystem = function(req, res) {
    res.render('system', {name: req.params.systemName});
};

exports.attract = function(req, res) {
    console.log('here-->' + req.params.systemName);
    request.get({
        url: 'http://localhost:3002/attract/romlist/' + req.params.systemName,
    }, function(error, response, body){
        console.log('body-->' + body);
        json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
    
};