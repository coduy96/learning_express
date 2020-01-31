var db = require('../db');
module.exports.authRequire = function(request, response, next){
    if(!request.cookies){
        response.redirect('/auth/login');
        return;
    }
    var user = db.get('users').find({id:request.cookies.userid}).value();
    if(!user){
        response.redirect('/auth/login');
        return;
    }
    next();
}