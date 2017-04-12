const router = require("express").Router();

router.route("/").get((req, res) => {
  res.json({
    version: "0.1.0"
  });
});

module.exports = router;

