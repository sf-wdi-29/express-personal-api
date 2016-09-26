var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var weirdAnimalsSchema = new Schema({
    name: String,
    image: String,
    location: String,
    discoveredBy: String,
    discoveryDate: String
});

var weirdAnimals = mongoose.model('weirdAnimals', weirdAnimalsSchema);

module.exports = weirdAnimals;
