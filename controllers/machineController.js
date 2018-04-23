var request = require('request');
var async = require('async');


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
        res.render('machines', { title: 'Mame Random Machine', error: err, current:page, pages: Math.ceil(results.count / perPage), machines: JSON.parse(results.list) });
    });
};

exports.detail = function(req, res) {
    request.get({
        url: 'http://localhost:3001/mame/api/machine/' + req.params.id, 
    }, function(error, response, body){
        res.render('testapi', { title: 'Search Mame Machine', error: error, data: JSON.parse(body) });
    });    
}

exports.random = function(req, res) {   
    async.parallel({
        one: function(callback) {
            request({
                url: 'http://localhost:3001/mame/api/random',
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


exports.gotoPage = (req, res) => {
    console.log('gotopage');
    var pageTogo = req.params.page;
    if (pageTogo == 'searchPage') {
        this.searchPage(req, res);
    } else if (pageTogo == 'advancedSearchPage') {
        this.advancedSearchPage(req, res);
    }
    
};

exports.searchPage = (req, res) => {
    console.log('searchpage');
    request({
        url: 'http://localhost:3001/mame/api/categories/all', 
        method: 'GET',
    }, function(error, response, body){
        res.render('search', { title: 'Search Mame Machine', error: error, categories: JSON.parse(body) });
    });    
};

exports.advancedSearchPage = (req, res) => {
    async.parallel({
        categories: function(callback) {
            request.get({
                url: 'http://localhost:3001/mame/api/categories/all',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    callback(null, body);
                }
            });    
        },
        genres: function(callback) {
            request.get({
                url: 'http://localhost:3001/mame/api/genres/all',
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                    callback(true, {});
                } else {
                    callback(null, body);
                }
            });    
        },
        manufacturers: function(callback) {
            request.get({
                url: 'http://localhost:3001/mame/api/manufacturers/all',
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
            res.render('advsearch', 
                { title: 'Advanced Search Random Machine'
                , error: err
                , categories: JSON.parse(results.categories) 
                , genres: JSON.parse(results.genres) 
                , manufacturers: JSON.parse(results.manufacturers) 
       });
    });
};

exports.advancedSearchResults = (req, res) => {
    console.log('adv search params');
    console.log(req.body);
    //json = JSON.stringify(req.body);
    //console.log(json);

    var perPage = 10;
    var page = req.params.page || 1;


    request.post({
        url: 'http://localhost:3001/mame/api/search/' + page, 
        form: req.body,
        headers: {
            "content-type": "application/json"
        },
        json: true,
    }, function (error, response, body) {
        console.log(body);
        console.log('total returned = ' + body.total);
        res.send(body);
    });
};

exports.searchByDescription = (req, res) => {
    var perPage = 9;
    var page = req.params.page || 1

    request.get({
        url: 'http://localhost:3001/mame/api/machine/desc/' + req.params.description + '/' + page, 
    }, function(error, response, body){
        json = JSON.parse(body);
        res.setHeader('Content-Type', 'application/json');
        res.send(json);
        //res.render('machines', { title: 'Search Mame Machine', error: error, current:page, pages: Math.ceil(json.length / perPage), machines: JSON.parse(body) });
    });    
    
};