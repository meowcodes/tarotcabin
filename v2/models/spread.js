var mongoose = require("mongoose");

var spreadSchema = new mongoose.Schema({
  name: String,
  num: Number,
  imgUrl: String,
  notes: String
});

module.exports = mongoose.model("Spread", spreadSchema);