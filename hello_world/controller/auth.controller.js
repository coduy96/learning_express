var db = require("../db");

module.exports.getLogin = function(request ,response, next){
    response.render('../views/auth/login.pug');
}

module.exports.postLogin = function(request, response, next){
    var requestBody = request.body;
    var user = db.get('users').find({email:requestBody.email}).value();
    if(!user){
        response.render('../views/auth/login.pug',{errors:['Email not exits']});
        return;
    }
    if(user.password != requestBody.password){
        response.render('../views/auth/login.pug',{errors:['Wrong password']});
        return;
    }
    response.cookie('userid', user.id,{ signed: true });
    response.redirect('/users');
    console.log(user);
}