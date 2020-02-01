//console.log(process.env);
require('dotenv').config()

var express = require("express");
var app = express();
var bodyParse = require("body-parser");
var port = 3000;
var userRoute = require("./routes/users.route");
var userAuth = require("./routes/auth.route");
var authMiddlewares = require("./middlewares/auth.middleware");
var cookieParser = require('cookie-parser')


app.set("views", "./views");
app.set("view engine", "pug");
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use('/users', authMiddlewares.authRequire, userRoute);
app.use('/auth', userAuth);
app.use(express.static('uploads')); //set static folder for getting file
app.get("/", function(request, response) {
  response.render("index", {
    username: "coduy96"
  });
});

app.listen(port, function() {
  console.log("Listenning on port " + port);
});