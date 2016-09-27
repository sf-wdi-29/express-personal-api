/*
 * VINYL MODEL
 */

var mongoose = require('mongoose'),
     Schema = mongoose.Schema;

var VinylSchema = new Schema({
  title: String,
  artist: String,
  releaseDate: String
});

// create Vinyl model from Schema
var Vinyl = mongoose.model('Vinyl', VinylSchema);

// export Vinyl model
module.exports = Vinyl;
