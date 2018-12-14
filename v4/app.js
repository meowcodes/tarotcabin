var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");

// connect to a database
mongoose.connect("mongodb://localhost/tarotcabin", {useNewUrlParser: true});
// make json readable
app.use(bodyParser.urlencoded({extended: true}));
// connect .css in public folder
app.use(express.static(__dirname + "/public"));
// allow method override in .ejs by using "_method"
app.use(methodOverride("_method"));
// enable omitting .ejs 
app.set("view engine", "ejs");

var tarotCardSchema = new mongoose.Schema({
  title: String,
	key: Number,
	element: String,
	keywords: [String]
});

var TarotCards = mongoose.model("tarotCards", tarotCardSchema,"Tarot");

var majorArcana = [
	{
		title: "The Fool",
		key: 0,
		element: "air",
		keywords: ["new beginnings", "potential", "naivete", "innocence", "purity", "openheartednesss", "carelessness", "immaturity"]
	},
	{
		title: "The Magician",
		key: 1,
		element: "air",
		keywords: ["power", "mental strength", "spiritual strength", "self-awareness", "mastery"]
	},
	{
		title: "The High Priestess",
		key: 2,
		element: "water",
		keywords: ["intuition", "spirituality", "feminine energy", "mystic"],
		notes: ["I cannot be comprehended, except by my permission"]
	},
	{
		title: "The Empress",
		key: 3,
		element: "earth",
		keywords: ["creation", "fruition", "love", "fertility", "victory", "abundance", "comfort", "stability", "balance"]
	},
	{
		title: "The Emperor",
		key: 4,
		element: "fire",
		keywords: ["authority", "willpower", "dominance", "abuse", "control", "severity"]
	},
	{
		title: "The Hierophant",
		key: 5,
		element: "earth",
		keywords: ["conformity", "inhibition", "repression", "concealment", "deception", "distortion", "overprotection", "persecution", "tradition"]
	},
	{
		title: "The Lovers",
		key: 6,
		element: "air",
		keywords: ["love"]
	},
	{
		title: "The Chariot",
		key: 7,
		element: "water",
		keywords: ["action", "triumph", "self-control", "willpower", "momentum", "progression", "flight", "flow"]
	},
	{
		title: "Strength",
		key: 8,
		element: "fire",
		keywords: ["compassion", "fortitude", "inner strength"]
	},
	{
		title: "The Hermit",
		key: 9,
		element: "earth",
		keywords: ["solitude", "wisdom", "introspection", "unorthodox", "advice", "mentor"]
	},
	{
		title: "Wheel of Fortune",
		key: 10,
		element: "fire",
		keywords: ["turning point", "karma", "alignment", "cycle"]
	},
	{
		title: "Justice",
		key: 11,
		element: "air",
		keywords: ["respoinsive action", "equilibrium", "fairness"]
	},
	{
		title: "The Hanged Man",
		key: 12,
		element: "water",
		keywords: ["new perspective", "unorthodox", "martyrdom", "underdog", "unjust persecution"],
		notes: ["Galileo"]
	},
	{
		title: "Death",
		key: 13,
		element: "water",
		keywords: ["metamophosis", "change", "new moon", "growth"],
		notes: ["no one is above suffering"]
	},
	{
		title: "Temperance",
		key: 14,
		element: "fire",
		keywords: ["inner balance", "oneness", "restoration", "harmony", "reconciliation", "self-integration"]
	},
	{
		title: "The Devil",
		keey: 15,
		element: "earth",
		keywords: ["temptation", "indulgence", "dishonesty", "negativity", "pessimism", "distrust", "resentment", "hate", "selfishness", "bondage"]
	},
	{
		title: "The Tower",
		key: 16,
		element: "fire",
		keywords: ["ambition","self-interest", "hubris", "suddenness", "epiphany", "ego", "humbling experience", "upheaval", "rock bottom"],
		notes: ["shit hits the fan"]
	},
	{
		title: "The Star",
		key: 17,
		element: "air",
		keywords: ["hope", "inspiration", "spiritual abundance", "empowerment", "optimism", "realease", "empathy", "inner warmth"],
		notes: ["light at the end of the tunnel"]
	},
	{
		title: "The Moon",
		key: 18,
		element: "water",
		keywords: ["contemplation", "unconscious mind", "latent potential", "inner self", "timid", "growth", "clarity", "veiled", "intuition", "serenity"]
	},
	{
		title: "The Sun",
		key: 19,
		element: "fire",
		keywords: ["recognition", "success", "accomplishment", "joy", "actualization"]
	},
	{
		title: "Judgement",
		key: 20,
		element: "water",
		keywords: ["awakening", "salvation", "correction"]
	},
	{
		title: "The World",
		key: 21,
		element: "earth",
		keywords: ["oneness", "wholeness", "cosmic union", "certainty"]
	}
];

// landing page
app.get("/", function(req, res){
    res.render("index");
});

// RESTful routes - CARD STUDY
// INDEX    /cards
app.get("/cards", function(req, res){
    TarotCards.find({}, function(err, allTarotCards){
        if(err){
            console.log(err);
        }else {
            console.log(allTarotCards);
            res.render("cards/index", {tarotCards : allTarotCards});
        }
    });
});

for(var i=0; i<majorArcana.length; i++){
  TarotCards.create(majorArcana[i], function(err, card){
    if(err){
      console.log(err);
    }else {
      console.log(card.title);
    }
  });
}

//  NEW     /cards/new
app.get("/cards/new", function(req, res){
    res.render ("cards/new");
});

// CREATE   /cards (functional)
app.post("/cards", function(req, res){
    res.redirect("/cards")
});

// SHOW     /cards/:id
app.get("/cards/:id", function(req, res){
    TarotCards.findById(req.params.id, function(err, foundCard){
        if(err){
            console.log(err);
        } else {
            console.log(foundCard);
            res.render("cards/show", {tarotCard: foundCard});
        }
    });
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