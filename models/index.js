var mongoose = require("mongoose");

module.exports.Book = require("./book.js");
module.exports.Profile = require("./profile.js");

mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/personal-api");
