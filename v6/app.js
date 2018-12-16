var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    TarotDeck   = require("./models/tarotDeck.js"),
    SeedDB      = require("./seeds");



// connect to local server
mongoose.connect("mongodb://localhost:27017/tarot", {useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

// seed initial data
SeedDB();

app.get("/", function(req, res) {
  res.render("index");
});

app.listen(7000, function() {
  console.log("tarot cabin is open");
}); 