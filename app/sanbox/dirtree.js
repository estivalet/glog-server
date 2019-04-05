const PATH = require('path');
const dirTree = require('directory-tree');
const fs = require('fs');

console.log('read dir');
var tree = dirTree('g:/');
//console.log(JSON.stringify(tree));
//console.log(tree);


console.log("about to write...");

fs.writeFile("c:/temp/tree.json", JSON.stringify(tree), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 
    


