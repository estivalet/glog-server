const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
   // process.exit();
});


app.get('/', function(req, res){
    res.send('Hello GET');
});

app.get('/romlist/:system', function(req, res) {
    res.send(req.params.system);
});

app.post('/', function(req, res){
    res.send('Hello POST');
});

app.delete('/del_user', function(req, res) {
    res.send('Page listing');
})

app.get('/list_user', function(req, res) {
    res.send('Page listing');
})

app.get('/ab*cd', function(req, res) {
    res.send('Page pattern match');
})

require('./app/routes/note.routes.js')(app);

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});