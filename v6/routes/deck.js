var express = require("express");
var router  = express.Router();
var TarotDeck = require("../models/tarotDeck");

// INDEX          deck index page (show all cards)
router.get("/", function(req, res) {
  TarotDeck.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else {
      res.render("deck/index", {tarotDeck : allCards});
    }
  });
});

// NEW            new deck page
router.get("/new", function(req, res){
  res.render("deck/new");
});

// CREATE         create a new deck
router.post("/", function(req, res){
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

// SHOW & EDIT    show individual card details 
router.get("/:id", function(req, res){
  TarotDeck.findById(req.params.id, function(err, card){
    if(err){
      console.log(err);
    }else {
      res.render("deck/show", {tarotCard : card});
    }
  });
});

// UPDATE         update existing card details
router.put("/:id", function(req, res){
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
// router.post("/:id", function(req, res){
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
router.post("/:id", function(req, res){
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
router.delete("/:id", function(req, res){
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

module.exports = router;

