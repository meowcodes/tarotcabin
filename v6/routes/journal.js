var express = require("express");
var router  = express.Router();

// INDEX          journal index page (show all journal entries)
router.get("/", function(req, res) {
  res.render("journal/index");
});

module.exports = router;