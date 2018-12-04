// packages as variables
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose"),
    Spread          = require("./models/spread.js"),
    TarotDeck       = require("./models/tarotDeck.js"),
    SeedDB          = require("./seeds")
    
// initialize packages for use
SeedDB();
mongoose.connect("mongodb://localhost/tarot_cabin", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// RESTful routes
// INDEX   /spreads            GET     Display all spreads           Spread.find()
app.get("/", function(req, res){
  res.render("index");
})
app.get("/spreads", function(req, res){
  Spread.find({}, function(err, allSpreads){
    if(err){
      console.log(err);
    } else {
      res.render("spreads/index",{spreads : allSpreads});
    }
  });
});

// NEW     /spreads/new        GET     Displays create form          N/A
app.get("/spreads/new", function(req, res){
  res.render("spreads/new");
});

// CREATE  /spreads            POST    Add new spread to DB          Spread.create()
app.post("/spreads", function(req, res){
  var newSpread = req.body.newSpread;
  
  Spread.create(newSpread, function(err, newSpread){
    if(err) {
      console.log(err);
    } else {
      res.redirect("spreads");
    }
  });
});

// SHOW    /spreads/:id        GET     Displays one spread           Spread.findById()
app.get("/spreads/:id", function(req, res){
  var spreadId = req.params.id;
  
  Spread.findById(spreadId).populate("comments").exec(function(err, foundSpread){
    if(err) {
      console.log(err);
    } else {
      console.log(foundSpread);
      res.render("spread/show", {spread:foundSpread});
    }
  });
});

// EDIT    /spreads/:id/edit   GET     Display edit form             Spread.findById()
app.get("/spreads/:id/edit", function(req, res){
  var spreadId = req.params.id;
  
  Spread.findById(spreadId, function(err, foundSpread){
    if(err) {
      console.log(err);
    } else {
      res.render("spread/edit", {spread:foundSpread});
    }
  }); 
});

// UPDATE  /spreads/:id        PUT     Update a spread and redirect  Spread.findByIdAndUpdate()
app.put("/spreads/:id", function(req, res){
  var editedSpread = req.body.editedSpread;
  
  Spread.findByIdAndUpdate(req.params.id, editedSpread, function(err, editedSpread){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/spreads/" + req.params.id);
    }
  });
});

// DESTROY /spreads/:id        DELETE  Delete a spread and redirect  Spread.findByIdAndDelete()
app.delete("/spreads/:id", function(req, res){
  Spread.findByIdAndDelete(req.params.id, function(err, editedSpread){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/spreads");
    }
  });
});

//NEW     /spreads/:id/comments/new GET Displays comment form
app.get("/spreads/:id/comments/new", function(req, res) {
    res.render("newComment");
})

// catch-all page
app.get("*", function(req, res){
  res.render("index");
});

// listen for http requests
app.listen(process.env.PORT, process.env.IP, function() {});