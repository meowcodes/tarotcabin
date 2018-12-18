var express = require("express");
var router  = express.Router();

// INDEX          explore index page (show all card exercises and journal prompts)
router.get("/", function(req, res) {
  res.render("explore/index");
});

module.exports = router;