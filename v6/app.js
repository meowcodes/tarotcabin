var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    ejsLint     = require('ejs-lint'),
    mongoose    = require("mongoose"),
    TarotDeck   = require("./models/tarotDeck.js"),
    SeedDB      = require("./seeds");
    
// connect to local server
mongoose.connect("mongodb://localhost:27017/tarot", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// seed initial data
SeedDB();

// landing page
app.get("/", function(req, res){
  res.render("index");
});

// cards index page (show all cards)
app.get("/cards/", function(req, res) {
  TarotDeck.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else {
      res.render("cards/index", {tarotDeck : allCards});
    }
  });
});

// cards show page (show individual card details)
app.get("/cards/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      console.log(card.title);
      res.render("cards/show", {tarotCard : card});
    }
  });
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 