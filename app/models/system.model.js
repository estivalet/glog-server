var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SystemSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {type: String},
    type: {type: String},
    category: {type: String},
    favorite: {type: Boolean},
    kids: {type: Boolean},
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);



//Export model
module.exports = mongoose.model('System', SystemSchema);