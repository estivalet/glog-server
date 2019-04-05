var fs = require('fs');
var readline = require('readline');
const dbConfig = require('../../config/database.config.js');
const models = require('../models/schema.model.js');
var ObjectId = require('mongoose').Types.ObjectId
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var system;

async function connectDb() {
    await mongoose.connect(dbConfig.url);
}

async function findSystem(system) {
    return await models.System.findOne({name:system});
}

async function insertRomlistGames(system, parentSystem) {
    let filename = "F:/EmuDreams/frontends/attractmode/romlists/" + system.name + ".txt";



    // PARSE ROMLIST
    // check if there is a favorites romlist ending in *.tag
    let favorites = [];
    if (fs.existsSync(filename.replace(".txt",".tag"))) {
        var lines = fs.readFileSync(filename.replace(".txt",".tag"), 'utf-8').split('\n').filter(Boolean);
        for(var i=0; i < lines.length; i++) {
            if(!lines[i].startsWith("#")) {
                var arr = lines[i].split(";");
                favorites.push(arr[0]);
            }
        }
    }
    
    // parse romlist
    let games = [];
    if (fs.existsSync(filename)) {
        var lines = fs.readFileSync(filename, 'utf-8').split('\n').filter(Boolean);
        for(var i=0; i < lines.length; i++) {
            if(!lines[i].startsWith("#")) {
                var arr = lines[i].split(";");
                games.push({name:arr[0], title:arr[1], emulator: arr[2], favorite: favorites.indexOf(arr[0]) > -1});
                var name = arr[0];
                if(name.indexOf("(")>0) {
                    name = name.substring(0, name.indexOf("(")-1);    
                } 
                
                const game = new models.Game({
                    name: name,
                    system: system._id
                });

                if(parentSystem) {
                    console.log(parentSystem._id);
                    console.log(name);

                    // Search the game in the parent system
                    const query1 = models.Game.findOne({"name":name,"system":new ObjectId(parentSystem._id)});
                    const result1 = await query1.exec();

                    // If game is already listed in the parent system then just update the game info adding
                    // childSystem
                    if(result1) {
                        console.log("FOUND:" + name);
                        result1.childSystems.push(system.name);
                        console.log(result1);
                        
                        const update = models.Game.updateOne({"name":name,"system":new ObjectId(parentSystem._id)}, result1);
                        const updres = await update.exec();
                    } else {
                        // If game is not listed in the parent system than add it
                        console.log("!!!!!NOT FOUND " + name);
                        const game = new models.Game({
                            name: name,
                            system: parentSystem._id,
                            childSystems: [system.name],
                        });
        
                        data = await game.save();
                    }
                } else {
                    // Save a game in the database.
                    data = await game.save();
                    //break;
                }

            }
        }
    }
}

async function doIt() {
    await connectDb();
    const system = await findSystem("Sega Master System Homebrew");
    const parentSystem = await findSystem("Sega Master System");
    await insertRomlistGames(system, parentSystem);
    process.exit(0);
}

doIt();
