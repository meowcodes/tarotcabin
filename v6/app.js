var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override")
    ejsLint         = require('ejs-lint'),
    mongoose        = require("mongoose"),
    TarotDeck       = require("./models/tarotDeck.js"),
    DefaultDeck     = require("./models/defaultDeck.js"),
    SeedDB          = require("./seeds");

    
// requiring routes
var deckRoutes      = require("./routes/deck"),
    journalRoutes   = require("./routes/journal"),
    readingRoutes   = require("./routes/reading"),
    exploreRoutes   = require("./routes/explore");

// connect to local server
mongoose.connect("mongodb://localhost:27017/tarot", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use("/deck", deckRoutes);
app.use("/journal", journalRoutes);
app.use("/reading", readingRoutes);
app.use("/explore", exploreRoutes);
app.set("view engine", "ejs");

// seed initial data
SeedDB();

// INDEX          landing page
app.get("/", function(req, res){
  res.render("index");
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 