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

    Machine
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, machines) {
            Machine.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('machines', {
                    machines: machines,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
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
        machine: function(callback) {
            Machine.count().exec(function (err, count) {
                // Get a random entry
                var random = Math.floor(Math.random() * count)
                Machine.findOne().skip(random).exec(callback);
            });
        },
    }, function(err, results) {
        console.log(results.machine.dipswitch.dipvalue);
        res.render('test', { title: 'Mame Random Machine', error: err, data: results });
    });
};
