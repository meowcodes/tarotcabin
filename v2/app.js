// packages as variables
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose")

// initialize packages for use
mongoose.connect("mongdb://localhost/tarotcabin", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extnded: true}));
app.set("view engine", "ejs");

// RESTful routes
// INDEX   /spreads            GET     Display all spreads           Spread.find()
app.get("/", function(req, res){
  res.render("index");
})
app.get("/spreads", function(req, res){
  res.render("spreads");
})

// NEW     /spreads/new        GET     Displays create form          N/A
app.get("/spreads/new", function(req, res){
  res.render("newSpread");
});

// CREATE  /spreads            POST    Add new spread to DB          Spread.create()
app.post("/spreads", function(req, res){
  res.redirect("spreads");
});

// SHOW    /spreads/:id        GET     Displays one spread           Spread.findById()
app.get("/spreads/:id", function(req, res){
});

// EDIT    /spreads/:id/edit   GET     Display edit form             Spread.findById()
app.get("/spreads/:id/edit", function(req, res){
});

// UPDATE  /spreads/:id        PUT     Update a spread and redirect  Spread.findByIdAndUpdate()
app.put("/spreads/:id/edit", function(req, res){
});

// DESTROY /spreads/:id        DELETE  Delete a spread and redirect  Spread.findByIdAndDelete()
app.delete("/spreads/:id", function(req, res){
  res.redirect("spreads");
});

// catch all page
app.get("*", function(req, res){
  res.render("index");
})

// listen for http requests
app.listen(process.env.PORT, process.env.IP, function() {});