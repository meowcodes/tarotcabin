var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override")
    ejsLint         = require('ejs-lint'),
    mongoose        = require("mongoose"),
    TarotDeck       = require("./models/tarotDeck.js"),
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

// INDEX          cards index page (show all cards)
app.get("/cards/", function(req, res) {
  TarotDeck.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else {
      res.render("cards/index", {tarotDeck : allCards});
    }
  });
});

// SHOW & EDIT    show individual card details 
app.get("/cards/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      res.render("cards/show", {tarotCard : card});
    }
  });
});

// UPDATE         update existing card details
app.put("/cards/:id", function(req, res){
  var editedElement = req.body.editedElement;

  TarotDeck.findByIdAndUpdate(req.params.id, editedElement,function(err, editedElement) {
    if(err) {
      console.log(err);
    }else {
      res.redirect("/cards/" + req.params.id);
    }
  });
});

// NEW            add new card details
app.post("/cards/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, newCardObj){
    if(err){
      console.log(err);
    }else {
      console.log(newCardObj);
      card.save();
      res.redirect("/cards/"+ req.params.id);
    }
  });
});

// NEW            add new keyword
app.post("/cards/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      console.log(card.title);
      var newKeyword = req.body.keyword;
      card.keywords.push(newKeyword);
      card.save();
      console.log(card.keywords);
      res.redirect("/cards/"+ req.params.id);
    }
  });
});

// DESTROY         delete a keyword
app.delete("/cards/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      card.keywords.splice(req.body.byeKeyword, 1);
      card.save();
      console.log(card.keywords);
      res.redirect("/cards/"+ req.params.id);
    }
  });
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 