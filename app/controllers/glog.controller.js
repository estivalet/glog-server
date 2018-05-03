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
