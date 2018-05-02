var request = require('request');
var async = require('async');

exports.listSystems = function(req, res) {
    request.get({
        url: 'http://localhost:3003/glog/system/all', 
    }, function(error, response, body) {
        json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
    });    
};
