var express = require("express");
var router  = express.Router();

// INDEX          readings index page (daily draw & link to past readings)
router.get("/", function(req, res) {
  res.render("reading/index");
});

module.exports = router;