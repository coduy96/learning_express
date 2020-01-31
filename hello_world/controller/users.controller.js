var db = require("../db");
var db = require("../db");
var shortid = require("shortid");

module.exports.index = function(request, response) {
  response.render("users/index", {
    users: db.get("users").value()
  });
};

module.exports.search = function(request, response) {
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
};

module.exports.getCreate = function(request, response) {
  response.render("users/create");
};

module.exports.postCreate = function(request, response) {
  request.body.id = shortid.generate();
  var errors = [];

  if(!request.body.name){
    errors.push('Name is required.');
  }
  if(!request.body.phone){
    errors.push('Phone is required. ');
  }
  if(errors.length){
    response.render('users/create',{errors:errors, values:request.body});
    return;
  }

  db.get("users")
    .push(request.body)
    .write();
  response.redirect("/users");
};

module.exports.getId = function(request, response) {
  var id = request.params.id;
  var user = db
    .get("users")
    .find({ id: id })
    .value();

  response.render("users/view", { user: user });
};
