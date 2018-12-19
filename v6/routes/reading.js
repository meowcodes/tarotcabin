var express = require("express");
var router  = express.Router();
var TarotDeck = require("../models/tarotDeck");

// INDEX          readings index page (daily draw & link to past readings)
router.get("/", function(req, res) {
  TarotDeck.find({}, function(err, allCards){
    if(err){
      console.log(err);
    }else {
      res.render("reading/index", {tarotDeck : allCards});
    }
  });
});

// NEW            new daily draw entry display
router.get("/new", function(req,res){
  TarotDeck.count().exec(function (err, count) {
    if(err) {
      console.log(err);
    }else {
      var randomNum = Math.floor(Math.random()*count);
      TarotDeck.findOne().skip(randomNum).exec(function (err, theCard) {
        if(err){
          console.log(err);
        } else {
          console.log(theCard);
          res.render("reading/new", {tarotCard : theCard});
        }
      });
    }
  });
});

// CREATE         create new daily draw entry
router.post("/", function(req,res) {

})

module.exports = router;