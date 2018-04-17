var request = require('request');

var Machine = require('../models/machine');

var async = require('async');

exports.index = function(req, res) {   
    
    async.parallel({
        machine_count: function(callback) {
            Machine.count({}, callback); // Pass an empty object as match condition to find all documents of this collection
        },
    }, function(err, results) {
        res.render('machine', { title: 'Mame Machines', error: err, data: results });
    });
};

exports.list = function(req, res) {
    var perPage = 9
    var page = req.params.page || 1

    async.parallel({
        count: function(callback) {
            request({
                url: 'http://localhost:3001/mame/api/total',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    console.log(response.statusCode, body);
                    callback(null, body);
                }
            });    
        },
        list: function(callback) {
            request.get({
                url: 'http://localhost:3001/mame/api/machines/' + page, 
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    console.log(response.statusCode, body);
                    callback(null, body);
                }
            });
        },
    }, function(err, results){
        console.log("********************");
        console.log(results.count);
        console.log(Math.ceil(results.count / perPage))
        res.render('machines', { title: 'Mame Random Machine', error: err, current:page, pages: Math.ceil(results.count / perPage), machines: JSON.parse(results.list) });
    });

 
 
};

exports.detail = function(req, res) {
    async.parallel({
        machine: function(callback) {
            Machine.findById(req.params.id)
              .populate('machine')
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.machine==null) { // No results.
            var err = new Error('machine not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('test', { title: 'Title', data:  results } );
    });    
}

exports.random = function(req, res) {   
    async.parallel({
        one: function(callback) {
            request({
                url: 'http://localhost:3001/mame/api/random', //URL to hit
                qs: {from: 'example', time: +new Date()}, //Query string data
                method: 'GET', // specify the request type
                headers: { // speciyfy the headers
                    'Content-Type': 'MyContentType',
                    'Custom-Header': 'Custom Value'
                },
                body: 'Hello Hello! String body!' //Set the body as a string
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    console.log(response.statusCode, body);
                    callback(null, body);
                }
            });    
            
        }
    }, function(err, results){
        res.render('testapi', { title: 'Mame Random Machine', error: err, data: JSON.parse(results.one) });
    });
};


exports.findAllCategories = (req, res) => {
    request({
        url: 'http://localhost:3001/mame/api/categories/all', 
        method: 'GET',
    }, function(error, response, body){
        res.render('search', { title: 'Search Mame Machine', error: error, data: JSON.parse(body) });
    });    
};