var mongoose = require("mongoose");

var tarotSchema = new mongoose.Schema({
  name: String,
  num: Number,
  arcana: String,
  keys: [String],
  rKeys: [String],
  desc: String,
  rDesc: String,
  imgUrl: String
});

var tarotDeck = mongoose.model("tarotDeck", tarotSchema);

var tarotCards = [
  {
    name: "The Fool",
    num: 0,
    arcana: "major",
    keys: ["adventurous"],
    rKeys: ["naive"],
    desc: "go for it",
    rDesc: "don't be naive",
    imgUrl: "https://66.media.tumblr.com/8fc05daae6b8e2b77a300be192fa056b/tumblr_mih5ko44BN1qdtuwuo1_500.jpg"
  }
];

// Card Information
tarotCards.forEach(function(tarotCard){
  tarotDeck.create(tarotCards, function(err, tarotCard){
    if (err) {
      console.log(err);
    } else {
      console.log(tarotCard[0]["name"]);
    }
  });
});

module.exports = tarotDeck;