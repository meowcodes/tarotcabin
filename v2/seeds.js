var mongoose = require("mongoose");
var Spread = require("./models/spread");
var Comment = require("./models/comment");


var initSpreads = [
  {
    name: "Daily Draw", 
    num: 2, 
    imgUrl: "https://66.media.tumblr.com/b90740aad62d102c5d6a48cd8247ba58/tumblr_ok07bsEaXn1vkzjjno1_500.jpg",
    notes: "simple daily draw"
  }, {
    name: "Daily Draw", 
    num: 2, 
    imgUrl: "https://66.media.tumblr.com/b90740aad62d102c5d6a48cd8247ba58/tumblr_ok07bsEaXn1vkzjjno1_500.jpg",
    notes: "simple daily draw"
  }, {
    name: "Daily Draw", 
    num: 2, 
    imgUrl: "https://66.media.tumblr.com/b90740aad62d102c5d6a48cd8247ba58/tumblr_ok07bsEaXn1vkzjjno1_500.jpg",
    notes: "simple daily draw"
  }
]

function seedDB(){
  Spread.deleteMany({}, function(err){
    if (err) {
      console.log(err);
    }else {
      console.log("removed all spreads");
      initSpreads.forEach(function(seed){
        Spread.create(seed, function(err, spread){
          if (err) {
            console.log(err);
          }else {
            console.log("added new spread");
            Comment.create({
              text: "meow",
              author: "Harang"
            }, function(err, comment){
              if (err) {
                console.log(err);
              } else {
                spread.comments.push(comment);
                spread.save();
                console.log("added new comment");
              }
            });
          }
        });
      });
    }
  });
}

module.exports = seedDB;