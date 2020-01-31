var express = require("express");
var app = express();
var bodyParse = require('body-parser');

var port = 3000;

var users = [
  { id: "1", name: "Duy" },
  { id: "2", name: "Men" },
  { id: "3", name: "Ke" }
];

app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(request, response) {
  //response.send('<h1>Hello world</h1>');
  response.render("index", {
    username: "coduy96"
  });
});

app.get("/users", function(request, response) {
  response.render("users/index", {
    users: users
  });
});

app.get("/users/search", function(request, response) {
    var q = request.query.q;
 
    var matchedUser = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
    });

    response.render('users/index',{
        users:matchedUser
    });
});

app.get("/users/create", function(request, response) {
  response.render("users/create");
});

app.post("/users/create", function(request, response) {
    users.push(request.body);
    response.redirect("/users");
});

app.listen(port, function() {
  console.log("Listenning on port " + port);
});
