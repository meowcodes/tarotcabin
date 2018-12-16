var mongoose = require("mongoose");

var tarotCardSchema = new mongoose.Schema({
  title: String,
  key: Number,
  element: String,
  keywords: [String]
}, {collection: "tarot"});

module.exports = mongoose.model("tarotCards", tarotCardSchema, "tarot");