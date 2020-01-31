var express = require("express");
var router = express.Router();
var db = require("../db");
var shortid = require("shortid");

router.get("/", function(request, response) {
  response.render("users/index", {
    users: db.get("users").value()
  });
});

router.get("/search", function(request, response) {
  var q = request.query.q;

  var matchedUser = db
    .get("users")
    .value()
    .filter(function(user) {
      return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
    });

  response.render("users/index", {
    users: matchedUser
  });
});

router.get("/create", function(request, response) {
  response.render("users/create");
});

router.post("/create", function(request, response) {
  request.body.id = shortid.generate();
  db.get("users")
    .push(request.body)
    .write();
  response.redirect("/users");
});

router.get("/:id", function(request, response) {
  var id = request.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();

  response.render("users/view", { user: user });
});

module.exports = router;
