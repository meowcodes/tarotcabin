var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");
    
mongoose.connect("mongodb://localhost/tarot_app", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var spreadSchema = new mongoose.Schema({
  name: String,
  number: Number,
  img: String
}, {collection: "tarot"});

var Spread = mongoose.model("Spread",spreadSchema);

// Spread.create({name: "Daily Draw", number: 2, img: "https://66.media.tumblr.com/b90740aad62d102c5d6a48cd8247ba58/tumblr_ok07bsEaXn1vkzjjno1_500.jpg"}, 
//   function(err, spread){ 
//     if(err){
//       console.log(err);
//     } else {
//       console.log("New spread: ");
//       console.log(spread.name);
//     }
// });

app.get("/", function(req,res){
  res.render("landing");
});

app.get("/spreads", function(req,res){
  Spread.find({}, function(err,allSpreads){
    if(err){
      console.log(err);
    } else {
      res.render("spreads", {spreads:allSpreads});
    }
  });
});

app.post("/spreads", function(req,res) {
  var name = req.body.name;
  var num = req.body.number;
  var img = req.body.img;
  var newSpread = {name: name, number: num, img: img}
  
  Spread.create(newSpread, function(err, newSpread){
    if(err){
      console.log(err);
    } else {
      res.redirect("/spreads");
    }
  });
});

app.get("/spreads/new", function(req,res){
  res.render("newspread");
});

app.get("/spreads/:id", function(req, res){
  Spread.findById(req.params.id, function(err, foundSpread){
    if(err){
      console.log(err);
    }else {
      res.render("show",{spreads:foundSpread})
    }
  })
})

app.listen(process.env.PORT, process.env.IP, function() {
});
