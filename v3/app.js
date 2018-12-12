var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose")

// connect to a database
mongoose.connect("mongodb://localhost/tarot_cabin", {useNewUrlParser: true});
// make json readable
app.use(bodyParser.urlencoded({extended: true}));
// connect .css in public folder
app.use(express.static(__dirname + "/public"));
// allow method override in .ejs by using "_method"
app.use(methodOverride("_method"));
// enable omitting .ejs 
app.set("view engine", "ejs");

// landing page
app.get("/", function(req, res){
    res.render("index");
})

// RESTful routes - CARD STUDY
// INDEX    /cards
app.get("/cards", function(req, res){
    res.render("cards/index");
});

//  NEW     /cards/new
app.get("/cards/new", function(req, res){
    res.render ("cards/new");
});

// CREATE   /cards (functional)
app.post("/cards", function(req, res){
    res.redirect("/cards")
});

// SHOW     /cards/:id
app.get("/cards/:id", function(req, res) {
   res.render("cards/show"); 
});

// EDIT     /cards/:id/edit
app.get("/cards/:id", function(req, res) {
    res.render("cards/edit");
});

// UPDATE   /cards/:id (functional)
app.put("/cards/:id", function(req,res){
    res.redirect("/cards/" + req.params.id);
});

// RESTful routes - EXERCISES
// INDEX    /exercises              SHOW ALL EXERCISES
app.get("/exercises", function(req, res){
    res.render("exercises/index");
});

//  NEW     /exercises/new          START A NEW EXERCISE
app.get("/exercises/new", function(req, res){
    res.render ("exercises/new");
});

// CREATE   /exercises (functional) POST THE NEW EXERCISE TO CARD
app.post("/exercises", function(req, res){
    res.redirect("/cards/" + req.params.id);
});

// catch-all page
app.get("*", function(req, res) {
    res.render("index");
});

// listen for requests
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("tarot cabin is open");
});