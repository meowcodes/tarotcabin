var mongoose = require("mongoose");
var TarotDeck = require("./models/tarotDeck");

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

function seedDB(){
  TarotDeck.deleteMany({}, function(err){
    if(err){
      console.log(err);
    }else {
      console.log("resetting deck");
      for(var i=0; i<majorArcana.length; i++){
        TarotDeck.create(majorArcana[i], function(err, card){
          if(err){
            console.log(err);
          }else {
            console.log("added ", card.title);
          }
        });
      }
    }
  });
}

module.exports = seedDB;