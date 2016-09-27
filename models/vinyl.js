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

var Vinyl = mongoose.model('Vinyl', VinylSchema);

module.exports = Vinyl;
