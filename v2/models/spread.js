var mongoose = require("mongoose");

var spreadSchema = new mongoose.Schema({
  name: String,
  num: Number,
  imgUrl: String,
  notes: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

module.exports = mongoose.model("Spread", spreadSchema);