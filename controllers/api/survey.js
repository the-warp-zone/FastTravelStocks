const router = require("express").Router();
var db = require("../../models");
// get route -> index
// router.get("/", function(req, res) {
//   console.log("Hello")
//   res.send("Request Recieved");
// });

router.get("/survey", function(req, res) {
  // replace old function with sequelize function
  db.Survey.findAll({
  })
    // use promise method to pass the burgers...
    .then(function(dbSurvey) {
      // into the main index, updating the page
      res.json(dbSurvey)
      
    })
});

module.exports = router;
