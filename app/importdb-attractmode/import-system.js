var fs = require('fs');
var parse = require('csv-parse');
var readline = require('readline');
const dbConfig = require('../../config/database.config.js');
const models = require('../models/schema.model.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var system;

async function connectDb() {
    await mongoose.connect(dbConfig.url);
}

async function importData() {
    var inputFile='c:/users/luisoft/Desktop/Frontends.csv';
    
    var parser = await parse({delimiter: ','}, function (err, data) {
        var db = [];
        data.forEach(async function(line) {
            const system = new models.System({
                "name" : line[0],
                "type" : line[1],
                "category" : line[2],
                "favorite" : (line[3] == 'X') ? true : false,
                "kids" : (line[4] == 'X') ? true : false,
            });
            db.push(system);
            console.log(system);
            await system.save();
        });
    });
    // read the inputFile, feed the contents to the parser
    fs.createReadStream(inputFile).pipe(parser);
}

async function doIt() {
    await connectDb();
    await importData();
}

doIt();
