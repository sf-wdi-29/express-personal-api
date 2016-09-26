var mongoose = require("mongoose");

module.exports.Profile = require("./profile.js");
module.exports.weirdAnimals = require("./weirdAnimals.js");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");
