var mongoose = require("mongoose");

var activitySchema = new mongoose.Schema({
  prompt: String,
  card: String
});

module.exports = mongoose.model("Activities", activitySchema);