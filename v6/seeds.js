var mongoose = require("mongoose");
var TarotDeck = require("./models/tarotDeck.js");

function seedDB(){
  TarotDeck.deleteMany({}, function(err){
    if(err){
      console.log(err);
    }else {
      console.log("resetting deck");
    }
  });
}

module.exports = seedDB;