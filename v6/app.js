var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    TarotDeck   = require("./models/tarotDeck.js");

// connect to local server
mongoose.connect("mongodb://localhost:27017/tarot", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

var tarotCardSchema = new mongoose.Schema({
  title: String,
  key: Number,
  element: String,
  keywords: [String]
}, {collection: "tarot"});

var TarotCards = mongoose.model("tarotCards", tarotCardSchema);

TarotCards.create({
  title: "The World",
  key: 21,
  element: "earth",
  keywords: ["oneness", "wholeness", "cosmic union", "certainty"]
}, function(err, card){
  if(err){
    console.log(err);
  }else {
    console.log(card.title);
  }
});

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 