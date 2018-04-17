const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/book-app");



module.exports.Book = require("./book");
module.exports.Author = require("./author");

// module.exports.Gargoyle = require("./gargoyle.js");
// module.exports.Goblin = require("./goblin.js");
// module.exports.Gnome = require("./gnome.js");