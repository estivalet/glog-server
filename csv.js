var fs = require('fs');
var parse = require('csv-parse');

 
var inputFile='c:/users/luisoft/Desktop/Frontends.csv';
console.log("Processing Countries file");
 
var parser = parse({delimiter: ','}, function (err, data) {
    // when all countries are available,then process them
    // note: array element at index 0 contains the row of headers that we should skip
    var db = [];
    data.forEach(function(line) {
      // create country object out of parsed fields
      var system = { "name" : line[0]
                    , "type" : line[1]
                    , "category" : line[2]
                    , "favorite" : (line[3] == 'X') ? true : false
                    , "kids" : (line[4] == 'X') ? true : false
                    };
      db.push(system);
      
    });    
    console.log(JSON.stringify(db,null,4));
    fs.writeFile('data.json', JSON.stringify(db,null,4), 'utf8', callback);
});

function callback() {
    console.log('done');
}
 
// read the inputFile, feed the contents to the parser
fs.createReadStream(inputFile).pipe(parser);