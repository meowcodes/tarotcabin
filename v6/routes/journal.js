var express = require("express");
var router  = express.Router();
var TarotDeck = require("../models/tarotDeck");

// INDEX & NEW    journal index page (show all journal entries & button for new daily draw)
router.get("/", function(req, res) {
  res.render("journal/index");
});

module.exports = router;