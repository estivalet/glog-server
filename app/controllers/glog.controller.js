var request = require('request');
var async = require('async');

exports.index = function(req, res) {
    async.parallel({
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

exports.showSystem = function(req, res) {
    res.render('system', {name: req.params.systemName});
};

exports.amControlPanel = function(req, res) {
    async.parallel({
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

exports.attract = function(req, res) {
    request.get({
        url: 'http://localhost:3002/attract/romlist/' + req.params.systemName,
    }, function(error, response, body){
        json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
};