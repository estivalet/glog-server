var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('Atari 2600.txt'),
    output: process.stdout,
    console: false
});

var games = []

rd.on('line', function(line) {
    console.log(line);
    var arr = line.split(";");
    games.push({name:arr[0], title:arr[1]});
});

rd.on('close', function() {
    var json = JSON.stringify(games);
    console.log(json);
});

