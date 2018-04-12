
const fct = require('./romlist-parser');

function someFunction() {
    let promise = fct.myfunction('Atari 2600.txt');
    return promise.then(result => {
        console.log(result);
        return result;
    });
}

someFunction();