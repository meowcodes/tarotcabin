var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override")
    ejsLint         = require('ejs-lint'),
    mongoose        = require("mongoose"),
    TarotDeck       = require("./models/tarotDeck.js"),
    DefaultDeck     = require("./models/defaultDeck.js"),
    SeedDB          = require("./seeds");
    
// connect to local server
mongoose.connect("mongodb://localhost:27017/tarot", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
// seed initial data
SeedDB();

// INDEX          landing page
app.get("/", function(req, res){
  res.render("index");
});

// NEW            new deck page
app.get("/deck/new", function(req, res){
  res.render("deck/new");
})

// CREATE         create a new deck
app.post("/deck", function(req, res){
  SeedDB();
  var newDeckSpecs = req.body.DeckSpecs;
  if(newDeckSpecs === "RWS"){
    for(var i=0; i<DefaultDeck.length; i++){
      TarotDeck.create(DefaultDeck[i], function(err, card){
        if(err){
          console.log(err);
        }else {
          console.log("added ", card.title);
        }
      });
    }
  }else {
    console.log(newDeckSpecs);
  }
  res.redirect("/deck/");
});

// INDEX          deck index page (show all cards)
app.get("/deck/", function(req, res) {
  TarotDeck.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else {
      res.render("deck/index", {tarotDeck : allCards});
    }
  });
});

// SHOW & EDIT    show individual card details 
app.get("/deck/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      res.render("deck/show", {tarotCard : card});
    }
  });
});

// UPDATE         update existing card details
app.put("/deck/:id", function(req, res){
  var editedCard = req.body.editedCard;

  TarotDeck.findByIdAndUpdate(req.params.id, editedCard,function(err, editedCard) {
    if(err) {
      console.log(err);
    }else {
      console.log(editedCard);
      res.redirect("/deck/" + req.params.id);
    }
  });
});

// NEW            add new card details
// app.post("/deck/:id", function(req, res){
//   TarotDeck.findById(req.params.id, function(err, newCardObj){
//     if(err){
//       console.log(err);
//     }else {
//       console.log(newCardObj);
//       card.save();
//       res.redirect("/deck/"+ req.params.id);
//     }
//   });
// });

// NEW            add new keyword
app.post("/deck/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      console.log(card.title);
      var newKeyword = req.body.keyword;
      card.keywords.push(newKeyword);
      card.save();
      console.log(card.keywords);
      res.redirect("/deck/"+ req.params.id);
    }
  });
});

// DESTROY         delete a keyword
app.delete("/deck/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      card.keywords.splice(req.body.byeKeyword, 1);
      card.save();
      console.log(card.keywords);
      res.redirect("/deck/"+ req.params.id);
    }
  });
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 