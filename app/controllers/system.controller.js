var fs = require('fs');
var path = require('path');

const models = require('../models/schema.model.js');

/**
 * Get all systems.
 * @param {Request} req
 * @param {Response} res 
 */
exports.findAllSystems = (req, res) => {
    models.System.find()
    .then(systems => {
        res.send(JSON.stringify(systems.sort()));
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving systems."
        });
    });
};


exports.findAllMediaForSystem = (req, res) => {
    var system = req.params.system;
}

/**
 * Example:
 * 
 *     walk("g:/glog/platform/" + system + "/media/system", function(err, results) {
 *       if (err) throw err;
 *       console.log(results);
 *     });
 * @param {*} dir 
 * @param {*} done 
 */
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
      if (err) return done(err);
      var pending = list.length;
      if (!pending) return done(null, results);
      list.forEach(function(file) {
        file = path.resolve(dir, file);
        fs.stat(file, function(err, stat) {
          if (stat && stat.isDirectory()) {
            walk(file, function(err, res) {
              results = results.concat(res);
              if (!--pending) done(null, results);
            });
          } else {
            results.push(file);
            if (!--pending) done(null, results);
          }
        });
      });
    });
  };
