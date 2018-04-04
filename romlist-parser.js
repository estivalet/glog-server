var fs = require('fs');
var readline = require('readline');

var rd = readline.createInterface({
    input: fs.createReadStream('Atari 2600.txt'),
    output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    console.log(line);
})