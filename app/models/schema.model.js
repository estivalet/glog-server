var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var systemSchema = new Schema(
  {
    name: {type: String},
    type: {type: String},
    category: {type: String},
    favorite: {type: Boolean},
    kids: {type: Boolean},
    //filters: [String], // default filters for the system: Hacks, Japan, Translated, Homebrew, Unlicensed, Protoypes
    parentSystem: {type: String}, // eg: Sega Master System Evolution has Sega Master System as parent. The child system has a subset of the games
    childSystems: [String]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var gameSchema = new Schema(
  {
    name: {type: String},
    title: {type: String},
    description: {type: String},
    favorite: {type: Boolean},
    hack: {type: Boolean},
    homebrew: {type: Boolean},
    indie: {type: Boolean},
    unlicensed: {type: Boolean},
    proto: {type: Boolean},
    translated: {type: Boolean},
    country: {type: String},
//    isFromParentSystem: {type: Boolean},
    system: { type: Schema.Types.ObjectId, ref: 'System' },
    childSystems: [String], // available in child systems, eg. the same game can be in Sega Master System and Sega Master System Evolution
    year: {type: String},
    manufacturer: {type: String},
    category: {type: String},
    players: {type: String},
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

var System = mongoose.model('System', systemSchema);
var Game = mongoose.model('Game', gameSchema);

module.exports = {
    System: System,
    Game: Game,
 }