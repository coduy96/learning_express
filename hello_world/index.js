var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var port = 3000;
var userRoute = require("./routes/user.route");

app.set("views", "./views");
app.set("view engine", "pug");
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use('/users',userRoute);
app.get("/", function(request, response) {
  response.render("index", {
    username: "coduy96"
  });
});

app.listen(port, function() {
  console.log("Listenning on port " + port);
});