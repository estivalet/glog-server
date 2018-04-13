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

exports.random = function(req, res) {   
    
    async.parallel({
        machine: function(callback) {
            Machine.count().exec(function (err, count) {
                // Get a random entry
                var random = Math.floor(Math.random() * count)
                Machine.findOne().skip(random).exec(callback);
            });
        },
    }, function(err, results) {
        console.log(results.machine.rom);
        res.render('random', { title: 'Mame Random Machine', error: err, data: results });
    });
};
