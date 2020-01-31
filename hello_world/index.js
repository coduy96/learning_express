var express = require("express");
var app = express();
var bodyParse = require("body-parser");

var port = 3000;

var low = require("lowdb");
var FileSync = require("lowdb/adapters/FileSync");
var shortid = require('shortid');

var adapter = new FileSync("db.json");
var db = low(adapter);

db.defaults({ users: [] }).write();

app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", function(request, response) {
  response.render("index", {
    username: "coduy96"
  });
});

app.get("/users", function(request, response) {
  response.render("users/index", {
    users: db.get("users").value()
  });
});

app.get("/users/search", function(request, response) {
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

app.get("/users/create", function(request, response) {
  response.render("users/create");
});

app.post("/users/create", function(request, response) {
  request.body.id = shortid.generate();
  db.get("users")
    .push(request.body)
    .write();
  response.redirect("/users");
});

app.get("/user/:id", function(request, response) {
  var id = request.params.id;

  var user = db
    .get("users")
    .find({ id: id })
    .value();

  response.render("users/view", { user: user });
});

app.listen(port, function() {
  console.log("Listenning on port " + port);
});
