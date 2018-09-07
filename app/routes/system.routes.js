module.exports = (app) => {
    const system = require('../controllers/system.controller.js');

    // Retrieve all Machine categories
    app.get('/glog/system/all', system.findAllSystems);

    app.get('/glog/system/:system/media', system.findAllMediaForSystem);
}