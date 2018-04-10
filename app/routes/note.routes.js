module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);


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
}